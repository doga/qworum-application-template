import { QworumScript, Qworum } from './deps.mjs';
import db from './modules/db.mjs';

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
  closeButton: document.querySelector('button#close'),
  title      : document.querySelector('h1#doc-title'),
  text       : document.querySelector('p#doc-text'),
  meta       : document.querySelector('dl#doc-meta'),
};

await showDoc();

async function showDoc() {
  // console.debug(`showing doc `);
  const
  // call argument
  docIdArg = await Qworum.getData('doc id'),
  docId    = docIdArg.value, // int
  docs     = JSON.parse(db.getItem('database')).documents,
  doc      = docs[docId];
  // console.debug(`doc id: ${docId} `);

  ui.title.innerText   = doc.title;
  ui.text.innerText = doc.text;

  // metadata
  const
  owner = {
    title: document.createElement('dt'),
    value: document.createElement('dd'),
  };

  owner.title.innerText = "Owner group";
  owner.value.innerText = (
    doc.ownerGroup.name ?
    `${doc.ownerGroup.name} <${doc.ownerGroup.id}>` :
    `<${doc.ownerGroup.id}>`
  );
  ui.meta.append(owner.title, owner.value);

  for (const event of doc.events) {
    const
    title = document.createElement('dt'),
    value = document.createElement('dd');

    title.innerText = event.eventType;
    value.innerText = (
      event.user.name ?
      `at <${event.timestamp}> by ${event.user.name} <${event.user.id}>` :
      `at <${event.timestamp}> by <${event.user.id}>`
    );

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
