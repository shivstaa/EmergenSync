import NavBar from "./NavBar.jsx";

function NavBarLayout(props) {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
}

export default NavBarLayout;
