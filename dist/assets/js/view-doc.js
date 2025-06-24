import { QworumScript, Qworum } from './deps.mjs';

const
// Data values
Json         = QworumScript.Json.build,
SemanticData = QworumScript.SemanticData.build,
// Instructions
Data     = QworumScript.Data.build,
Return   = QworumScript.Return.build,
Sequence = QworumScript.Sequence.build,
Goto     = QworumScript.Goto.build,
Call     = QworumScript.Call.build,
Fault    = QworumScript.Fault.build,
Try      = QworumScript.Try.build,
// Script
Script = QworumScript.Script.build,

// UI
ui = {
  closeButton : document.querySelector('button#close'),
  updateButton: document.querySelector('button#update'),
  title       : document.querySelector('h1#doc-title'),
  text        : document.querySelector('p#doc-text'),
  meta        : document.querySelector('dl#doc-meta'),
};

ui.updateButton.addEventListener('click', async (event) => {
  // window.location.replace('update.html');
  await Qworum.eval(
    Script(
      Goto('update.html')
    )
  );
});

await showDoc();

async function showDoc() {
  // console.debug(`showing doc `);
  const
  // call argument
  docIdArg = await Qworum.getData('doc id'),
  docId    = docIdArg.value, // int
  docs     = JSON.parse(localStorage.getItem('database')).documents,
  doc      = docs[docId];
  // console.debug(`doc id: ${docId} `);

  ui.title.innerText   = doc.title;
  ui.text.innerText = doc.text;

  // metadata
  const
  ownerGroup = doc.ownerGroup,
  ownerUi = {
    title             : document.createElement('dt'),
    value             : document.createElement('dd'),
    groupFormattedName: document.createElement('span'),
    groupId           : document.createElement('span'),
  };
  ownerUi.title.innerText = "Owner group";
  ownerUi.groupFormattedName.classList.add('groupname');
  ownerUi.groupFormattedName.append(`${ownerGroup.name}`);
  ownerUi.groupId.classList.add('group-id');
  ownerUi.groupId.append(`${ownerGroup.id}`);
  ownerUi.value.append(ownerUi.groupFormattedName, ' ', ownerUi.groupId);
  ui.meta.append(ownerUi.title, ownerUi.value);

  for (const event of doc.events) {
    const
    user  = event.user,
    title = document.createElement('dt'),
    value = document.createElement('dd'),
    userFormattedName = document.createElement('span'),
    userId = document.createElement('span');

    title.innerText = `${event.eventType} at ${event.timestamp}`;
    userFormattedName.classList.add('username');
    userFormattedName.append(`${user.name}`);
    userId.classList.add('user-id');
    userId.append(`${user.id}`);
    value.append(userFormattedName, ' ', userId);

    // if (user.photo) {
    //   const 
    //   br  = document.createElement('br'),
    //   img = document.createElement('img');

    //   img.src = `${user.photo}`;
    //   value.append(img);
    // }

    ui.meta.append(title, value);
  }

  // closeButton.onclick(async (event) => {
  //   console.debug('close button clicked');
  //   event.preventDefault();
  //   await Qworum.eval(
  //     Script(
  //       Return(Json(docId))
  //     )
  //   );
  // });

  ui.closeButton.addEventListener('click', async (event) => {
    // console.debug('close button clicked');
    // event.preventDefault();
    await Qworum.eval(
      Script(
        // Fault('* origin')
        Return(Json(null))
      )
    );
  });

}
