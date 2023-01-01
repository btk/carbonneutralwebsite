import styles from "./style.module.css"

function Header(){

  return(
    <div style={{margin: "auto", width: 40}}>
      <svg width="40px" height="100%" viewBox="0 0 247 390" style={{"fillRule":"evenodd","clipRule":"evenodd","strokeLinecap":"round","strokeLinejoin":"round","strokeMiterlimit":"1.5"}}>
      	<path className={styles.wheel} d="M123.359,79.775l0,72.843" style={{"fill":"none","stroke":"#ccc","strokeWidth":"20px"}}/>
      	<path className={styles.mouse} d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z" style={{"fill":"none","stroke":"#eee","strokeWidth":"20px"}}/>
      </svg>
    </div>
  );
}

export default Header;
