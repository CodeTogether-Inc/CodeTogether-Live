import React from 'react';
import Link from '@docusaurus/Link';

export default function Button({ to, text }) {
  return (
    <Link to={to}>   
      <button class="button-37" role="button">{text}</button>
    </Link>
  );
}