const Card = (props) => (<div  {...props} class={props.class + " card-panel card"}>{props.children}</div>);
export default Card;