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

// UI
ui = {
  closeButton : document.querySelector('button#close'),
  title       : document.querySelector('h1#item-title'),
  text        : document.querySelector('p#item-text'),
};

await showitem();

async function showitem() {
  // console.debug(`showing item `);
  const
  // call argument
  itemIdArg = await Qworum.getData('item id'),
  itemId    = itemIdArg.value, // int
  items     = JSON.parse(db.getItem('database')).items,
  item      = items[itemId];
  // console.debug(`item id: ${itemId} `);

  ui.title.innerText = item.title;
  ui.text.innerText  = item.text;

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

