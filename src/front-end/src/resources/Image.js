import profilepic from  './img/profile.png';

function Image(props) {

    if (props.url === null || props.url === "" || props.url === undefined) {
        return (
            <img style={{display:'inline-block',  objectFit: 'contain', width: '100%', height: '100%'}} src={profilepic} alt="Defaultogo" />
        )
    } else {
        return (
            <img style={{display:'inline-block', objectFit: 'contain', width: '100%', height: '100%'}} src={props.url} alt="urlLogo" />
        )
    }
}

export default Image;