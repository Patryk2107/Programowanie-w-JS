    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const addNoteButton = document.querySelector("#addNote")
    const wrapper = document.querySelector('#wrapper');
    const addNoteModal = document.querySelector('#addNoteModal');
    const search = document.querySelector('#search');


    const pinNote = (date) => {
      const note = notes.find(note => note.date === date);
      note.pinned = !note.pinned
      localStorage.setItem("notes", JSON.stringify(notes))

      getNotes()
    }
    
    const getNotes = () => {
      wrapper.innerHTML = "";
      notes
      .filter(note => note.content.includes(search.value) || note.title.includes(search.value))
      .sort((a, b) => b.pinned - a.pinned || b.date - a.date)
      .forEach(note => {
        const noteEl = document.createElement('div');
        noteEl.classList.add('note');
        const title = document.createElement('span');
        const content = document.createElement('p');
        const date = document.createElement('span');
        const pin = document.createElement('button');
        pin.textContent = note.pinned ? 'odepnij' : 'przypnij'
        pin.addEventListener('click', () => pinNote(note.date))

        title.innerText = note.title;
        content.innerText = note.content;
        date.innerText = new Date(note.date).toLocaleString();
        noteEl.style.backgroundColor = note.color;
        noteEl.appendChild(title)
        noteEl.appendChild(content)
        noteEl.appendChild(date);
        noteEl.appendChild(pin);
        wrapper.appendChild(noteEl);
      })
    }

    getNotes();


    const saveNote = () => {
      const title = document.querySelector('#title').value;
      const content = document.querySelector('#content').value;
      const color = document.querySelector('#color').value;

      notes.push({
        title,
        content,
        color,
        date: new Date().valueOf(),
        pinned: false
      })

      localStorage.setItem('notes', JSON.stringify(notes))
      addNoteModal.classList.add('hidden')
      getNotes();
    }

    const saveButton = document.querySelector('#save')
    const cancelButton = document.querySelector('#cancel')

    saveButton.addEventListener('click', saveNote);
    cancelButton.addEventListener('click', () => addNoteModal.classList.add('hidden'))
    addNoteButton.addEventListener('click', () => addNoteModal.classList.remove('hidden'));
    search.addEventListener('input', getNotes);