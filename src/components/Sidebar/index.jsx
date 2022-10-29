import React, { useState } from 'react';

import useWindowDimensions from './WindowDimensions';
import SidebarMobile from './SidebarMobile';
import Header from '../Header/index';
import SidebarDesktop from './SidebarDesktop';
import { isAuthenticated } from '../../services/auth';
import { Navigate } from 'react-router-dom';

const SIZE_MOBILE = 750;

export default function Sidebar({ children }) {
    const { width } = useWindowDimensions();

    const [isOpenSidebarMobile, setIsOpenSidebarMobile] = useState(false);

    const openSidebarMobile = () => setIsOpenSidebarMobile(true);
    const onClose = () => setIsOpenSidebarMobile(false);

    if (!isAuthenticated())
        return <Navigate to="/access-denied" replace={true} />

    return (
        <>
            {
                SIZE_MOBILE > width ?
                    <>
                        <Header showButtonToOpenMenu={true} openSidebarMobile={openSidebarMobile} />
                        <SidebarMobile
                            children={children}
                            isOpen={isOpenSidebarMobile}
                            onClose={onClose}
                        />
                    </> :
                    <>
                        <Header
                            showButtonToOpenMenu={false}
                            position="fixed"
                            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        />
                        <SidebarDesktop children={children} />
                    </>
            }
        </>
    )
}
