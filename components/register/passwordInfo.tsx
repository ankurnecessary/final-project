import React from 'react';

function PasswordInfo() {
  return (
    <ul className="flex flex-col gap-y-1 text-xs font-normal">
      <li>At least 8 characters</li>
      <li>At least 1 upper case letter.</li>
      <li>At least 1 lower case letter.</li>
      <li>At least 1 number.</li>
      <li>At least 1 special character.</li>
    </ul>
  );
}

export default PasswordInfo;
