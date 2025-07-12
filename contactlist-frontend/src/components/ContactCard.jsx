export default function ContactCard(props){
    return(
        <div>
            <img src="/src/assets/user.png" style={{ width: '100px', height: '100px' }}  alt="" />
            <h3>{props.firstName} {props.lastName}</h3>
            <p>{props.phoneNumber}</p>
        </div>
    )
}