import { 
  defaultRoleset,
  Persona,
  QworumScript, Qworum, 
} from './deps.mjs';
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

// 
// persona = await Qworum.getPersona(),

// UI
ui = {
  nodocsMessage: document.querySelector('p#nodocs-message'),
  docsList     : document.querySelector('ol#docs-list'),
  newDocButton : document.querySelector('button#create-doc'),
};

// hide the "create" button from non-creators
// if (!persona.userFitsAnyOf([defaultRoleset.findRole(/creator/)])) ui.newDocButton.classList.add('hide');

ui.newDocButton.addEventListener('click', async () => {
  // if (persona.userFitsAnyOf([defaultRoleset.findRole(/creator/)]))
  await Qworum.eval(
    Script(
      Sequence(
        Call('@', '../create-doc/'),
        Goto(),
      )
    )
  );
});

await showDocumentTitles();

async function showDocumentTitles() {
  // db.clear();
  const 
  persona = await Qworum.getPersona(),
  docs    = JSON.parse(db.getItem('database')).documents;

  if(docs.length>0) ui.nodocsMessage.style = 'display:none';

  for (let docId = 0; docId < docs.length; docId++) {
    const 
    doc = docs[docId],
    ownerGroupIsAPartner = 
    [persona.groupId, ...persona.partnerGroupIds].find(
      id => `${id}` === doc.ownerGroup.id
    );

    if (!ownerGroupIsAPartner) continue;

    const
    li     = document.createElement('li'),
    button = document.createElement('button');

    button.setAttribute('type', 'button');
    button.className = 'doc-title nav';
    button.innerText = doc.title;
    li.append(button, doc.ownerGroup.name ? ` (Owner: ${doc.ownerGroup.name})` : ` (Owner: <${doc.ownerGroup.id}>)`);
    ui.docsList.append(li);

    // if (!persona.userFitsAnyOf([defaultRoleset.findRole(/reader/)]))continue;

    button.addEventListener('click', async () => {
      await Qworum.eval(
        Script(
          Sequence(
            Call('@', '../view-doc/', { name: 'doc id', value: Json(docId) }),
            Goto(),
          )
        )
      );
    });
  }
}
