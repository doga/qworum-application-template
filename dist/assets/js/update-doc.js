import { 
  UserId, GroupId,
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

// call state
docIdArg = await Qworum.getData('doc id'),
docId    = docIdArg.value, // int

// UI
ui = {
  closeButton: document.querySelector('button#close'),
  saveButton : document.querySelector('button#save'),
  title      : document.querySelector('input#doc-title'),
  text       : document.querySelector('textarea#doc-text'),
};

ui.closeButton.addEventListener('click', async () => {
  await Qworum.eval(
    Script(
      Return(Json(null))
    )
  );
});

ui.saveButton.addEventListener('click', async () => {
  const
  title = ui.title.value.trim(),
  text  = ui.text.value.trim();

  if(![title,text].every(t => t.length > 0)){
    alert('Did not save: title and/or text is empty.');
    return;
  }

  const 
  persona = await Qworum.getPersona(),
  database = JSON.parse(localStorage.getItem('database')),
  doc = database.documents[docId];

  doc.title = title;
  doc.text = text;
  doc.events.push({
    eventType: 'updated',
    user: {
      id: `${persona.userId}`,
      // id: `${UserId.uuid()}`,
      name: persona.userVcard.formattedName,
      photo: persona.userVcard.photo?.dataUrl, // A `data:` URL
    },
    timestamp: new Date().toISOString()
  });

  // console.debug(database);

  localStorage.setItem('database', JSON.stringify(database));

  await Qworum.eval(
    Script(
      Return(Json(null))
    )
  );

});

init();

function init(){
  const
  docs     = JSON.parse(localStorage.getItem('database')).documents,
  doc      = docs[docId];

  ui.title.value = doc.title;
  ui.text.value  = doc.text;
}
