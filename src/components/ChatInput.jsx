/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react';


export default function ({ onSendMessage, sending, inputRef }) {
  // const ref = inputRef = React.useRef(null);

  const sendMessage = () => {
    const msg = inputRef.current.value;
    inputRef.current.value = '';

    if(msg === '' || sending) return;
    onSendMessage(msg);
  }

  return (
    <>
   <div className="flex justify-center flex-row w-full p-5"> 
    <div className="flex items-center p-2 rounded-2xl shadow-md">
    <input
      disabled={sending}
      ref={inputRef}
      className=" p-3 font-sans font-normal text-base border-none outline-none"
      placeholder="Type your destination..."
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendMessage();
        }
      }}
    />
    <button
      disabled={sending}
      onClick={sendMessage}
      className=" px-2 "
      aria-label="send"
    >
      Create
    </button>
  </div>
</div>
</>

  );
}
