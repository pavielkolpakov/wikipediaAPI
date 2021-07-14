import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    picture: {
        maxWidth: 300,
        maxHeight: 200,
        margin: 10
    },
    opened: {
        maxWidth: '50%',
        objectFit: 'contain',
    },
    paper: {
        maxHeight: '95%',
        display: 'flex',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: 10,
    },
    info: {
        marginLeft: 10,
    }
}));

export default function ImageView() {
    const [articles, setArticles] = useState([]);
    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState({
        imageinfo: [{
            url: '',
            user: '',
            size: '',
            timestamp: '',
            width: '',
            height: '',
        }],
    });
    const classes = useStyles();

    const handleOpen = info => {
        setOpen(true);
        setInfo(info);
        console.log(info.imageinfo[0].url);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const onChangeQuery = query => {
        const jsonp = require('jsonp');

        const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=images&prop=imageinfo&gimlimit=500&redirects=1&iiprop=timestamp|user|url|size|dimensions|thumbmime|mediatype&format=json&titles=${query}`;

        jsonp(url, null, (err, data) => {
            if (err) {
                console.error(err.message);
            } else {
                setArticles(Object.values(data.query.pages));
            }
        });
    }

    return (
        <div>
            <h1>Wikipedia Images</h1>

            <SearchForm onSubmit={onChangeQuery} />
                
            <div>
                {articles.map(article => (
                    <img key={article.title} alt="text" className={classes.picture} src={article.imageinfo[0].url} onClick={() => handleOpen(article)} />
                ))}
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <img className={classes.opened} src={info.imageinfo[0].url} alt="text" />
                        <div className={classes.info}>
                            <h3>{info.title}</h3>
                            <p>Uploaded by: {info.imageinfo[0].user}</p>
                            <p>Size: { info.imageinfo[0].size }</p>
                            <p>Width: { info.imageinfo[0].width }</p>
                            <p>Height: {info.imageinfo[0].height}</p>
                            <p>Timestamp: {info.imageinfo[0].timestamp}</p>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
