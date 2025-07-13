import Swal from 'sweetalert2'

export default function Alert(props){
    const showAlert = () => {
    Swal.fire({
      title: props.title,
      text: props.text,
      icon: props.icon,
      confirmButtonText: props.confirmButtonText
    });
  };

  return (
    <div>
      <button onClick={showAlert}>{props.button}</button>
    </div>
  );

}

//<Alert title = 'Success!' text = 'Your action was successful!' icon = 'success' confirmButtonText = 'OK' button = "Delete" />