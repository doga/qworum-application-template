import { 
  defaultRoleset,
  Persona,
  QworumScript, Qworum, 
} from './deps.mjs';

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

// if(persona)
showDocumentTitles();

function showDocumentTitles() {
  // localStorage.clear();

  if(!localStorage.getItem('database'))
  localStorage.setItem('database', JSON.stringify({
    documents: [
      {
        title: 'a doc',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        ownerGroup: {
          id  : 'urn:qworum:group:9cc04a05-5a0d-4534-bacd-e4fc84970ef8',
          name: 'Q Inc., project X-1234 working group'
        },
        events: [
          {
            eventType: 'created',
            user: {
              id  : 'urn:qworum:user:9cc04a05-5a0d-4534-bacd-e4fc84970ef8',
              name: 'J. Adams',
            },
            timestamp: '2025-05-28T08:45:04.877Z',
          }
        ]
      }
    ]
  }));

  const docs = JSON.parse(localStorage.getItem('database')).documents;
  if(docs.length>0) ui.nodocsMessage.style = 'display:none';

  for (let docId = 0; docId < docs.length; docId++) {
    const doc = docs[docId];

    // only show what the user is entitled to view
    // if (![`${persona.groupId}`, ...persona.partnerGroupIds.map(id => `${id}`)].find(
    //   idStr => idStr === doc.ownerGroup.id
    // )) continue;

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
