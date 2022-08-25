import React from 'react';
import { paramCase } from 'param-case';
import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';
import {useColorMode} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Card({ id, iconl, icond, title, description, to }) {
  if (icond === undefined) icond = iconl;
  return (
    <Link to={to} className="image-card">      
      <ThemedImage sources={{light:  useBaseUrl(iconl), dark: useBaseUrl(icond) }}/>
      <div className="card-content">
        <div className="title" id={id && paramCase(title)}>
          {title}
        </div>
        <div className="description">{description}</div>
      </div>
    </Link>
  );
}