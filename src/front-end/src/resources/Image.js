import profilepic from  './img/profile.png';

function Image(props) {

    if (props.url === null) {
        return (
            <img style={{margin: '2.5%', objectFit: 'contain', maxHeight: '90%', maxWidth: '90%'}} src={profilepic} alt="Logo" />
        )
    } else {
        return (
            <img style={{margin: '2.5%', objectFit: 'contain', maxHeight: '90%', maxWidth: '90%'}} src={props.url} alt="Logo" />
        )
    }
}

export default Image;