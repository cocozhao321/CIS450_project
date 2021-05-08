import React from 'react';
import { Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';

export default class PageNavbar extends React.Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(){
        return(
            <Navbar expand="lg" color="warning">
                <Container>
                    <NavbarBrand>Stay Home and Eat Well</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                    </NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="/home">
                                    Home <span className="sr-only">(current)</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/search">
                                    Search
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/calories">
                                    Calories
                                </NavLink>
                            </NavItem>
							<NavItem>
                                <NavLink href="/account">
                                    Saved Recipes
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}