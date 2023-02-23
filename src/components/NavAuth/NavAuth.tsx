import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import authOperations from '../../redux/features/auth/authOperations';
import authSelectors from '../../redux/features/auth/authSelectors';
import useViewportSizes from '../../hooks/useViewportSizes';
import breakpoints from '../../utils/breakpoints';

import UserName from '../UserName';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

import styles from './NavAuth.module.scss';
import Portal from '../Portal';
import publicRoots from '../../utils/publicRoots';
import ConfirmationModal from '../ConfirmationModal';

export default function NavAuth() {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(authSelectors.getUserName);

  const sizes = useViewportSizes();
  const isMobileView = sizes.innerWidth < breakpoints.TABLET;

  const [isOpenModal, setOpenModal] = useState(false);

  const onLogoutClick = () => {
    // dispatch(authOperations.logOut());
    setOpenModal(!isOpenModal);
  };

  return (
    <div className={styles.navWrapper}>
      <UserName userNameStr={userName} />

      {isMobileView && <MobileMenu logoutClick={onLogoutClick} />}

      {!isMobileView && <DesktopMenu logoutClick={onLogoutClick} />}

      {isOpenModal && (
        <Portal wrapperId={publicRoots.ChoiceModal}>
          <ConfirmationModal />
        </Portal>
      )}
    </div>
  );
}
