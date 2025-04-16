import type { Component } from 'solid-js';
import Header from './Header';
import Footer from './Footer';
import { RouteSectionProps } from '@solidjs/router';

const Layout: Component<RouteSectionProps<any>> = (props) => {
    return (
        <>
            <Header />
            {props.children}
            <Footer />
        </>
    );
};
export default Layout;
