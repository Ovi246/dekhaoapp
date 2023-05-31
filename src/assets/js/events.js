import helpers from "./helpers.js";

window.addEventListener("load", () => {
  //When the chat icon is clicked

  document.querySelector("#toggle-chat-pane").addEventListener("click", (e) => {
    let chatElem = document.querySelector("#chat-pane");
    let mainSecElem = document.querySelector("#main-section");

    if (chatElem.classList.contains("chat-opened")) {
      chatElem.setAttribute("hidden", true);
      mainSecElem.classList.remove("col-md-9");
      mainSecElem.classList.add("col-md-12");
      chatElem.classList.remove("chat-opened");
    } else {
      chatElem.attributes.removeNamedItem("hidden");
      mainSecElem.classList.remove("col-md-12");
      mainSecElem.classList.add("col-md-9");
      chatElem.classList.add("chat-opened");
    }

    //remove the 'New' badge on chat icon once chat is opened.
    setTimeout(() => {
      if (
        document.querySelector("#chat-pane").classList.contains("chat-opened")
      ) {
        helpers.toggleChatNotificationBadge();
      }
    }, 300);
  });

  //When the video frame is clicked. This will enable picture-in-picture
  document.getElementById("local").addEventListener("click", () => {
    if (!document.pictureInPictureElement) {
      document
        .getElementById("local")
        .requestPictureInPicture()
        .catch((error) => {
          console.error(error);
        });
    } else {
      document.exitPictureInPicture().catch((error) => {
        console.error(error);
      });
    }
  });

  //When the 'Create room" is button is clicked
  document.getElementById("create-room").addEventListener("click", (e) => {
    e.preventDefault();

    const user = localStorage.getItem("user");
    if (user) {
      let roomName = document.querySelector("#room-name").value;
      let yourName = document.querySelector("#your-name").value;

      if (roomName && yourName) {
        document.querySelector("#err-msg").innerText = "";

        sessionStorage.setItem("username", yourName);

        let roomLink = `${location.origin}?room=${roomName
          .trim()
          .replace(" ", "_")}_${helpers.generateRandomString()}`;

        document.querySelector(
          "#room-created"
        ).innerHTML = `Room successfully created. Click <a href='${roomLink}'>here</a> to enter room. 
                Share the room link with your partners.`;

        document.querySelector("#room-name").value = "";
        document.querySelector("#your-name").value = "";
      } else {
        document.querySelector("#err-msg").innerText =
          "All fields are required";
      }
    } else {
      window.location.href = "/login";
    }
  });

  //When the 'Enter room' button is clicked.
  document.getElementById("enter-room").addEventListener("click", (e) => {
    e.preventDefault();

    let name = document.querySelector("#username").value;

    if (name) {
      //remove error message, if any
      document.querySelector("#err-msg-username").innerText = "";

      sessionStorage.setItem("username", name);

      location.reload();
    } else {
      document.querySelector("#err-msg-username").innerText =
        "Please input your name";
    }
  });

  //video overlay icons functions
  document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("expand-remote-video")) {
      helpers.maximiseStream(e);
    } else if (e.target && e.target.classList.contains("mute-remote-mic")) {
      helpers.singleStreamToggleMute(e);
    }
  });

  //recording options modal
  document.getElementById("closeModal").addEventListener("click", () => {
    helpers.toggleModal("recording-options-modal", false);
  });
});
