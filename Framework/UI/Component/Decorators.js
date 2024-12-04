import React, { memo, useContext, useState, useCallback, useEffect } from 'react';
import { Divider } from 'react-native-paper';

/**
 * Divider component.
 * 
 * @returns {JSX.Element} The Divider component.
 */
export const DividerComp = ({...props}) => <Divider {...props} />;