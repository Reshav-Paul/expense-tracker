import { faClose } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../components/IconButton";
import { lightColorScheme } from "../utilities/themeUtil";

let HoverForm: React.FC<{ close: () => void, onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }> = function HoverForm(props) {
  let hoverFormStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'var(--bg-col)',
    padding: '1rem',
    marginBottom: '0',
    display: 'flex',
    flexDirection: 'column',
    width: '220px',
    maxWidth: '220px',
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onSubmit(e);
    props.close();
  }

  return <form action="" className="hover-form dp02" style={hoverFormStyle} onSubmit={handleSubmit}>
    <div className="d-flex jc-end ai-center">
      <IconButton icon={faClose} btnText='' iconColor={lightColorScheme.ui.secondary} iconPosition={'right'}

        onClick={e => props.close()} />
    </div>
    {props.children}
  </form>
}

export default HoverForm;