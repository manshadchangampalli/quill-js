import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import 'quill/dist/quill.bubble.css';
import { Storage } from "../firebase/config";
import { ref ,uploadBytesResumable, getDownloadURL} from "firebase/storage";

export default function IndexPage() {
  const theme = 'snow';
  const modules = {
    toolbar: [
      [{header: [1, 2,false]}],
      ['bold', 'italic', 'underline', 'strike'],
      ['image','video','link','code-block'],
      [{ list: 'ordered'}, { list: 'bullet' }],
      [{align:[]}]
    ],
  };
  const formats =['header','bold','italic','underline','strike','image','video','link','code-block','list','align']
  const { quill, quillRef } = useQuill({modules,formats,theme})
  //insert to editor
  const insertToEditor = (url) => {
    console.log(url);
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'image', url);
  }
  //save the file to server
  const saveToServer = (image) => {
    const storageRef = ref(Storage,'images/'+ image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on('state_changed', 
    (snapshot) => {},
    (error) => {
      console.log("error",error)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        insertToEditor(downloadURL)
      });
    }
    )
  }

  //image handler 
  const selectLocalImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    };
  }
    useEffect(() => {
      if(quill) {
        quill.on('text-change', () => {
        console.log(quill.root.innerHTML); // Get innerHTML using quill
        });
        quill.getModule('toolbar').addHandler('image', selectLocalImage);
    }
  }, [quill]);


    return (
      <div style={{ width: "600px", height: "300px" }}>
        <div ref={quillRef} />
      </div>
    );
  
}
