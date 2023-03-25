/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable react/button-has-type */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import { useContext } from 'react'
import { gql, useQuery } from "@apollo/client";
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/extensions
import { ThemeContext } from "../../contexts/theme"
import DataConnect from './DataConnect';

const Blog = () => {
  const [{ themeName }] = useContext(ThemeContext)
  return(
      <div id='top' className={`${themeName} app`}>
        <DataConnect/>
    </div>
    )}

export default Blog