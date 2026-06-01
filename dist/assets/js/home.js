import { QworumScript as QS, Qworum } from './deps.mjs';
import db from './modules/db.mjs';

const
// Data values
Json         = QS.Json.build,
SemanticData = QS.SemanticData.build,
// Instructions
Data     = QS.Data.build,
Return   = QS.Return.build,
Sequence = QS.Sequence.build,
Goto     = QS.Goto.build,
Call     = QS.Call.build,
Fault    = QS.Fault.build,
Try      = QS.Try.build,
// Script
Script = QS.Script.build,

// 
// persona = await Qworum.getPersona(),

// UI
ui = {
  noitemsMessage: document.querySelector('p#noitems-message'),
  itemsList     : document.querySelector('ol#items-list'),
};


await showDocumentTitles();

async function showDocumentTitles() {
  // db.clear();
  const 
  items = JSON.parse(db.getItem('database')).items;

  if(items.length === 0) ui.noitemsMessage.classList.remove('hide');

  for (let itemId = 0; itemId < items.length; itemId++) {
    const 
    item = items[itemId];

    const
    li     = document.createElement('li'),
    button = document.createElement('button');

    button.setAttribute('type', 'button');
    button.className = 'item-title nav';
    button.innerText = item.title;
    li.append(button);
    ui.itemsList.append(li);

    button.addEventListener('click', async () => {
      await Qworum.eval(
        Script(
          Sequence(
            Call('@', '../view-item/', { name: 'item id', value: Json(itemId) }),
            Goto(),
          )
        )
      );
    });
  }
}
