'use strict';
 (function () {
let groupVal = document.querySelector('#group');
let ip = 'appliancepp.mxvirtual.com';

let apiUrl = `https://appliancepp.mxvirtual.com`;
let websocketAddress;
let mxGroupName;

let d;
let strTime;
let strDate;
let timestamp;
let roomId;
let persistId;
let pack;
let loginReq;
let ws;
let agent;
let chatActive = false;
let timeout = null;
let typing = true;
let maxFileSize;
let webToken;
let errorMessage = document.querySelector('p.errorM');
let ipAddress = document.querySelector('#ip');
let loadingIcon = document.querySelector('.fa-refresh');
let startChat = document.querySelector('.chat-btn');
let startChatBlock = document.querySelector('.start-chat');
let customName = document.querySelector('.chat-intro input');
let webChat = document.querySelector('.web-chat');
let chatIcon = document.querySelectorAll('.chat-icon');
let connectAgent = document.querySelector('.connect-agent');
let messageBox = document.querySelector('.message-box');
let chatSpace = document.querySelector('.chat-space');
let messageArea = document.querySelector('.messages');
let sendChatBtn = document.querySelector('button.send-chat');
let textArea = document.querySelector('textarea');
let collapseChat = document.querySelector('.collapse-chat');
let closeChat = document.querySelector('.close-chat');
let chatNotification = document.querySelector('.chat-notification');
let timeHold = document.querySelectorAll('.time-hold span.time-info');
let modalBox = document.querySelector('.close-modal');
let startNewChat = document.querySelector('.leave-chat-recon');
let continueChat = document.querySelector('.continue-chat');
let reconnectModal = document.querySelector('.close-modal-reconnect');
let modalClose = document.querySelector('.modal-btn');
let leaveChat = document.querySelector('.leave-chat');
let declineChat = document.querySelector('.declined-chat');
let fileUploadHtml = document.querySelector('#fileAttachment')
let chatLeft = document.querySelector('div.chat-left');
let agentLeft = document.querySelector('.agent-left');
let typingBlock = document.querySelector('.typing');
let chatNote = document.querySelector('.chat-note');
let waitMessage = document.querySelector('.wait-message');
let animateMessage = document.querySelector('.wait-animate');
let chatRoom = document.querySelector('.chat-room');
let notToast = document.getElementById("notification-toast");
let modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
let img = document.getElementById("myImg");
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");

// // let declinedBtn = document.querySelector('.declined-chat');
let chatState;
function hideConnectState() {
    waitMessage.classList.remove('visible');
    animateMessage.classList.remove('visible');
}

 function showConnectState() {
     waitMessage.classList.add('visible')
     animateMessage.classList.add('visible')
 }
function updateTime (){
    d = new Date();
    timestamp = Math.floor(Date.now() / 1000);
    strTime = d.toLocaleString(['en-US'], { hour: '2-digit', minute: '2-digit' });
    strDate = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
}

let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

let timeInfo = new Date();
for (let i = 0; i < timeHold.length; ++i) {
    timeHold[i].innerHTML = `${months[timeInfo.getMonth()]} ${timeInfo.getDate()}, ${timeInfo.getFullYear()} `;
}

let toolkit = new CstaToolkit();

let temp = JSON.parse(localStorage.getItem('webchat'));
     if(temp) {
         customName.value = temp.name
         webToken = temp.session
         roomId = temp.roomId
         startChatting()
         
         if (!chatActive) {
             hideChat();
         }
         //!!
         
     }

let wsClient =  {
    init: function () {
    },
    sendMessage: function (message,roomId,name) {
        var packw = toolkit.createWebChatMsgNew(
            message,roomId,name,
            function (data) {
            }
        );
        ws.send(packw);
    },
    sendQuestion: function (roomId,name,question) {
        var packw = toolkit.createWebChatQuestion(
            roomId,name,question,
            function (data) {
            }
        );
        ws.send(packw);
    },
    sendStatus: function(ackCode, msgId, persistId, recipId, groupId, ackType, from, fromName, roomId,timestamp,action,group){
        var status = toolkit.createImMsgAckStatus(
            ackCode, msgId, persistId, recipId, groupId, ackType, from, fromName, roomId,timestamp,action,group,
            function (data) {
            }
        );
        try {
            ws.send(status);
        } catch (ee) {

        }
        
    }
};


     function clearOldSystemMessage(){
         [].forEach.call(document.querySelectorAll('.system-messages'),function(e){
             e.parentNode.removeChild(e);
         });
     }

function clearOldStatus(){
    [].forEach.call(document.querySelectorAll('.m-status'),function(e){
        e.parentNode.removeChild(e);
    });
}

 function clearOldStatusSeen(){
     [].forEach.call(document.querySelectorAll('.m-status-seen'),function(e){
         e.parentNode.classList.remove('seen-m')
         e.parentNode.removeChild(e);
     });
 }


 function createName(name) {
     var shortname = '';
     try {
         shortname = name.trim().split(' ').map(function (item, index) {
             if (index < 2) {
                 return item[0].toUpperCase()
             }
         }).join('');
     }
     catch (e) {
         
     }

     return shortname;
 }


 function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
    var loadPromise;
     var cancelNextLoad = function() {
         clearInterval(loadPromise);
     };
     function keepAlive(){
         cancelNextLoad()
         let msg =  toolkit.createKeepAlive()
         ws.send(msg)
         loadPromise = setInterval(keepAlive,30000)
     }

    var callResponseHandler = function (eventData) {
        if(eventData.status === 'failed'){
            setTimeout(function () {
                chatError()
                errorMessage.style.display = 'block';
                errorMessage.innerHTML = `Login Failed`
            },1000);
            ws.close()
            return
        }
        if(eventData.type = 'loginResponce') {
            agent = eventData.agent;
            webToken = eventData.webToken
            if(eventData.dispConnected === 'false'){
                ws.send(pack)
            } else {
                showModalReconnect()

            }
            maxFileSize = eventData.maxFileSize
        }

    }


var callEventHandlers = function (eventName, eventData) {
    if(eventName === 'csta_error'){
        setTimeout(function () {
            chatError()
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = `${eventData.error}`
        },1000);
        ws.close()
        return
    }
    if (eventData.statusNew === 'PARTNER_CONNECTED') {
        wsClient.sendMessage('Intro text: '+params.text+'; Page name: '+params.pageName);
        createNewChatMessage('out','Intro text: '+params.text+'; Page name: '+params.pageName);
    }
    if(eventName=== 'im_msg_ack' && eventData.ackCode === 'IMS_WC_ACCEPTED'){
        roomId =  eventData.roomId;
        agent = eventData.agent;
        chatState ='connected';
        keepAlive()
        setTimeout(function () {
            hideConnectState()
            chatSpace.style.display = 'block';
            messageBox.style.pointerEvents = 'all';
        },1500)

        let webchat = {
            session: webToken,
            name: customName.value,
            roomId: roomId
        }
        localStorage.setItem('webchat', JSON.stringify(webchat));
    }

    if (eventData.ackCode === 'IMS_EDITED'){
        
        let el = document.querySelector(`[data-id='${eventData.persistId}'] span.message-txt`);
        el.innerText = eventData.text
    }
    if (eventData.ackCode === 'IMS_WC_CANCELLED'){
        if(chatState!=='decline') {
            chatState = 'cancel';
        }
        ws.close()
        setTimeout(function () {
            hideConnectState()
            chatSpace.style.display = 'block';
            agentLeft.innerHTML = `Customer support agents are busy, please try again later`
            chatLeft.style.display = 'block';
            chatNote.style.display = 'none';
            messageBox.style.pointerEvents = 'none';
            localStorage.removeItem('webchat'); //IS
            updateScrollText();
        },1000)
        // updateScrollText()
    }
    if (eventData.ackCode === 'IMS_WC_DECLINED'){

        chatState = 'decline';
        hideConnectState()

        updateScrollText()
    }

    if (eventData.ackCode === 'IMS_DELIVERED'){
        if (!messageArea.children[messageArea.children.length-1].classList.contains('out-message')
            || messageArea.children[messageArea.children.length-1].classList.contains('seen-m')){
            return
        }
        clearOldStatus()
        messageArea.children[messageArea.children.length-1].setAttribute('data-id',eventData.persistId);
        let node = document.createElement("DIV");
        node.setAttribute('class','m-status')
        let textnode = document.createTextNode("Delivered");
        node.appendChild(textnode);
        messageArea.children[messageArea.children.length-1].appendChild(node)
    }

    if (eventData.ackCode === 'IMS_SEEN'){
        if (!messageArea.children[messageArea.children.length-1].classList.contains('out-message')){
            return
        }
        clearOldStatusSeen();
        let el = document.querySelector(`[data-id='${eventData.persistId}']`);
        if(el===null && el.attributes['seen']==='true'){
            return
        }
        el.classList.add('seen-m');
        el.setAttribute('seen','true');
        if(el.lastChild.className ==='m-status'){
            el.removeChild(el.lastChild)
        }
        let node = document.createElement("DIV");
        node.setAttribute('class','m-status-seen')// Create a <li> node
        let textnode = document.createTextNode("Seen");
        node.appendChild(textnode);
        el.appendChild(node)
    }

    if(eventData.ackCode === 'IMS_TYPING'){
        if(eventData.agent===''){
            eventData.agent = 'Customer service';
        }
        if(eventData.status === 'true'){
            typingBlock.style.display = 'block';
            typingBlock.innerHTML = `<p class="find-agent">${eventData.agent} is typing<span>.</span><span>.</span><span>.</span></p>`
        } else {
            typingBlock.style.display = 'none';
        }
    }
    if(eventName === 'message'){
        if(eventData.fromName===null){
            eventData.fromName = 'Agent'
        }
        var d = new Date(parseInt(eventData.timestamp*1000))
        let strTime = d.toLocaleString(['en-US'], { hour: '2-digit', minute: '2-digit' });
        let strDate = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
        eventData.time = strTime;
        eventData.date = strDate;
    }
    if (eventName === 'im_msg') {
        
        if (document.hidden) {
            return
        }
        if(!chatActive) {
            if(chatNotification.firstElementChild.innerHTML === ''){
                chatNotification.style.display ='block';
                chatNotification.firstElementChild.innerHTML = 0;
            }
            chatNotification.firstElementChild.innerHTML = parseInt(chatNotification.firstElementChild.innerHTML) + 1;
        }
        if(eventData.fromName===null){
            eventData.fromName = 'Customer service';
        }
        if(chatActive && !document.hidden) {
            checkElementViewability();
        }

        if(eventData.packetType === 'PTC_FILE') {
            getFileInfo(webToken,eventData.persistId,'agentwebchat').then(function (data) {
                let d = new Date(parseInt(eventData.timestamp*1000))
                let strTime = d.toLocaleString(['en-US'], { hour: '2-digit', minute: '2-digit' });
                let strDate = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
                eventData.time = strTime;
                eventData.date = strDate;
                createNewFileMessage('in', eventData,JSON.parse(data.response).files[0],'file');
                updateTime();
                wsClient.sendStatus('IMS_DELIVERED',eventData.msgId,eventData.persistId,'','','WebChat','',customName.value,roomId, timestamp);

            }).catch(function (error) {
                
            })
            return
        }

        if(eventData.packetType === 'PTC_SYS'){
            let d = new Date(parseInt(eventData.timestamp*1000))
            let strTime = d.toLocaleString(['en-US'], { hour: '2-digit', minute: '2-digit' });
            let node = document.createElement("DIV");
            node.setAttribute('class','system-messages');
            node.style.clear = 'both';
            node.innerHTML = `<span class="time-info"> ${strTime}</span> <span>${eventData.msg}</span>`
            if(chatState === 'connecting'){
                connectAgent.appendChild(node)
            } else {
                messageArea.appendChild(node)
            }
            
            return
        }
        agent = eventData.fromName;
        let d = new Date(parseInt(eventData.timestamp*1000))
        let strTime = d.toLocaleString(['en-US'], { hour: '2-digit', minute: '2-digit' });
        let strDate = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
        eventData.time = strTime;
        eventData.date = strDate;
        updateTime ();
        persistId = eventData.persistId;
        wsClient.sendStatus('IMS_DELIVERED',eventData.msgId,eventData.persistId,'','','WebChat','',customName.value,roomId, timestamp);
        createNewChatMessage('in', eventData);
    }
};


document.addEventListener('visibilitychange', function(){
    if (document.hidden) {
        return
    }
})

function isElementInView(element) {
    var containerRect = chatRoom.getBoundingClientRect();
    var elementBoundingBox = element.getBoundingClientRect();
    var elementTopY = elementBoundingBox.top - containerRect.top;
    var elementBottomY = (elementBoundingBox.top - containerRect.top) + elementBoundingBox.height;
    return elementTopY >= 0 && elementBottomY <= Math.min(chatRoom.clientHeight || 0);
}
var checkElementViewability = debounce(function () {
    let elements = document.querySelectorAll(".in-message .chat-txt span.message-txt");
    for(let i = 0; i < elements.length; i++) {
        if(isElementInView(elements[i])) {
            if(!elements[i].hasAttribute('seen')){
                elements[i].setAttribute('seen',true);
                wsClient.sendStatus('IMS_SEEN','',elements[i].parentNode.parentNode.parentNode.attributes['data-id'].value,'','','WebChat','',customName.value,roomId, timestamp);
            }
        } else {
        }
    }
},250)


function showNotification(text) {
 notToast.innerText = text;
 notToast.className = "show";
 setTimeout(function(){ notToast.className = notToast.className.replace("show", ""); }, 3000);
}


var proceedSession = function () {
    toolkit.setupResponseCallbacks(
       function(event){
           callResponseHandler(event)
       },
        function(event){
            callResponseHandler(event)
        }
    );
    toolkit.setupEventCallbacks(
        function (event) {
            callEventHandlers('delivered', event);
        },
        function (event) {
            callEventHandlers('established', event);
        },
        function (event) {
            callEventHandlers('cleared', event);
        },
        function (event) {
            callEventHandlers('parked', event);
        },
        function (event) {
            callEventHandlers('held', event);
        },
        function (event) {
            callEventHandlers('retrieved', event);
        },
        function (event) {
            callEventHandlers('assigned', event);
        },
        function (event) {
            callEventHandlers('presence', event);
        },
        function (event) {
            callEventHandlers('csta_error', event);
        },
        function (event) {
            callEventHandlers('network_error', event);
        },
        function (event) {
            callEventHandlers('call_log', event);
        },
        function (event) {
            callEventHandlers('status', event);
        },
        function (event) {
            callEventHandlers('config', event);
        },
        function (event) {
            callEventHandlers('partner', event);
        },
        function (event) {
            callEventHandlers('message', event);
        },
        function (event) {
            callEventHandlers('agent_deleted', event);
        },
        function (event) {
            callEventHandlers('agent_added', event);
        },
        function (event) {
            callEventHandlers('im_msg', event);
        },
        function (event) {
            callEventHandlers('im_msg_ack', event);
        },
        function (event) {
            callEventHandlers('ws_agent_added', event);
        },
        function (event) {
            callEventHandlers('ws_agent_deleted', event);
        }
    );
    ws.send(loginReq);
}

function isOpen(ws) {
    return ws.readyState === ws.OPEN
}

function chatWaiting(){
    startChatBlock.style.display = 'none';
    chatRoom.classList.add('visible');
    connectAgent.classList.add('visible');
    showConnectState();
    messageBox.style.display = 'flex';
    messageBox.style.pointerEvents = 'none';
}
function setupWS (){
    try {
        websocketAddress  = `wss://appliancepp.mxvirtual.com:7779`;
        mxGroupName = 'Chat';
        ws = new WebSocket(websocketAddress);
        errorMessage.style.display = 'none';
    } catch (e) {
        chatError()
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = 'Cannot connect to customer service.';
        return
    }
    chatState = 'connecting';
    chatWaiting()

    ws.onopen = (e) => {
        ws.send('{session_id: ""}')
        
    }


    ws.onerror = (e) => {
        cancelNextLoad()
        chatError();
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = 'Cannot connect to customer service.';
    }

    ws.onclose = function(event) {
        cancelNextLoad()
        if(ws.readyState ===1){
            return
        }
        typingBlock.style.display = 'none';

        if(errorMessage.style.display === 'block'){
            wsClient.sendStatus('IMS_WC_CANCELLED','','','','','WebChat','',customName.value,roomId, timestamp);
            return
        }else {
            setTimeout(function () {
                hideConnectState()
                if (chatState === 'cancel'){
                    agentLeft.innerHTML = `Thank you for chatting with us. We are always happy to help you!`
                } else if(chatState === 'decline'){
                    clearOldSystemMessage()
                    agentLeft.innerHTML = `Customer support agents are busy, please try again later`;
                } else if(chatState ==='restarted'){
                    clearOldSystemMessage()
                    chatLeft.style.display = 'none';
                    return
                }
                else {
                    if(!startChatBlock.style.display==='block'){
                        chatSpace.style.display = 'block';
                        agentLeft.innerHTML = `Customer support agents are not available at this time, please try again later`;
                    }


                }
                chatLeft.style.display = 'block';
                chatNote.style.display = 'none';
                messageBox.style.pointerEvents = 'none';
            },1000)
            updateScrollText()
        }
    };

    loginReq = toolkit.createWebSession(roomId,customName.value,mxGroupName,webToken,getBrowser ());

    pack = toolkit.createCommunication(
        'IMS_WC_REQUEST',
        '0',
        '0',
        "",
        'WebChat',mxGroupName,customName.value,
        function () {}
    );
    ws.onmessage=function(event){

        if (isSessionToken(event.data)) {
            proceedSession(event.data);

        } else {
            toolkit.parseData(event.data);
        }
    }


}

window.onbeforeunload = function (e) {
      try {
          ws.close();
      } catch (error) {}
  };

var isSessionToken = function (message) {
    return (message.indexOf("session_valid") != -1);
};

function updateScrollText(){
    chatRoom.scrollTop = chatRoom.scrollHeight;
}

 function getBrowser () {
     const userAgent = navigator.userAgent;
     let browser = "unkown";
     // Detect browser name
     browser = (/ucbrowser/i).test(userAgent) ? 'UCBrowser' : browser;
     browser = (/edg/i).test(userAgent) ? 'Edge' : browser;
     browser = (/googlebot/i).test(userAgent) ? 'GoogleBot' : browser;
     browser = (/chromium/i).test(userAgent) ? 'Chromium' : browser;
     browser = (/firefox|fxios/i).test(userAgent) && !(/seamonkey/i).test(userAgent) ? 'Firefox' : browser;
     browser = (/; msie|trident/i).test(userAgent) && !(/ucbrowser/i).test(userAgent) ? 'IE' : browser;
     browser = (/chrome|crios/i).test(userAgent) && !(/opr|opera|chromium|edg|ucbrowser|googlebot/i).test(userAgent) ? 'Chrome' : browser;;
     browser = (/safari/i).test(userAgent) && !(/chromium|edg|ucbrowser|chrome|crios|opr|opera|fxios|firefox/i).test(userAgent) ? 'Safari' : browser;
     browser = (/opr|opera/i).test(userAgent) ? 'Opera' : browser;

     // detect browser version
     switch (browser) {
         case 'UCBrowser': return `${browser}/${browserVersion(userAgent,/(ucbrowser)\/([\d\.]+)/i)}`;
         case 'Edge': return `${browser}/${browserVersion(userAgent,/(edge|edga|edgios|edg)\/([\d\.]+)/i)}`;
         case 'GoogleBot': return `${browser}/${browserVersion(userAgent,/(googlebot)\/([\d\.]+)/i)}`;
         case 'Chromium': return `${browser}/${browserVersion(userAgent,/(chromium)\/([\d\.]+)/i)}`;
         case 'Firefox': return `${browser}/${browserVersion(userAgent,/(firefox|fxios)\/([\d\.]+)/i)}`;
         case 'Chrome': return `${browser}/${browserVersion(userAgent,/(chrome|crios)\/([\d\.]+)/i)}`;
         case 'Safari': return `${browser}/${browserVersion(userAgent,/(safari)\/([\d\.]+)/i)}`;
         case 'Opera': return `${browser}/${browserVersion(userAgent,/(opera|opr)\/([\d\.]+)/i)}`;
         case 'IE': const version = browserVersion(userAgent,/(trident)\/([\d\.]+)/i);
             // IE version is mapped using trident version
             // IE/8.0 = Trident/4.0, IE/9.0 = Trident/5.0
             return version ? `${browser}/${parseFloat(version) + 4.0}` : `${browser}/7.0`;
         default: return `unknown/0.0.0.0`;
     }
 }

 function browserVersion (userAgent,regex) {
     return userAgent.match(regex) ? userAgent.match(regex)[2] : null;
 }

 function humanFileSize(size) {
     var i = Math.floor( Math.log(size) / Math.log(1024) );
     return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
 };

function urlify(text) {
     var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
     //var urlRegex = /(https?:\/\/[^\s]+)/g;
     return text.replace(urlRegex, function(url,b,c) {
         var url2 = (c == 'www.') ?  'http://' +url : url;
         return '<a href="' +url2+ '" target="_blank">' + url + '</a>';
     })
}

 function fileMessage(link,name,ext,type){
     let fileUrl = `${apiUrl}/${link}`;
     if(type==='out'){
         fileUrl = link;
     }

     let fileMessage = `
    <a href="${fileUrl}" download="${name}">
    <span>${ext}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 30 35" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
    <g>
        <g fill="none">
            <path d="M21.472 0h18.207l9.65 9.813v23A2.166 2.166 0 0 1 47.186 35H21.472a2.166 2.166 0 0 1-2.143-2.187V2.187A2.166 2.166 0 0 1 21.472 0z" transform="translate(-476 -316) translate(456.671 316)"></path>
            <path fill="#707070" d="M21.472 1.5c-.355 0-.643.308-.643.687v30.626c0 .379.288.687.643.687h25.714c.355 0 .643-.308.643-.687V10.427L39.049 1.5H21.473m0-1.5h18.207l9.65 9.813v23c0 1.208-.96 2.187-2.143 2.187H21.472c-1.183 0-2.143-.979-2.143-2.187V2.187C19.329.98 20.289 0 21.472 0z" transform="translate(-476 -316) translate(456.671 316)"></path>
        </g>
        <g>
            <path fill="#707070" stroke="#707070" stroke-width="0.5px" d="M318.368 969.094v-.3c-.009-.117-.388-.337-.392-.455h-6.265a2.213 2.213 0 0 1-2.211-2.212l.006-6.675v.032c-.194-.009-.388-.021-.582-.032-.141.025-.283.041-.426.056v6.619a3.216 3.216 0 0 0 3.211 3.212h6.657z" transform="translate(-476 -316) translate(495.788 317.089) translate(-308.498 -959.452)"></path>
        </g>
    </g>
    </svg>
    </a>
`
     return fileMessage
 }

 function createFileMessageHistoryOut(data){
     var div = document.createElement('div')
     div.classList.add('out-message')
     let ext = data.file.fileName.split('.').pop();
     let link = `/newapi/config/user?command=cli_download_file&session=${webToken}&fileId=${data.fileId}`;

     let contentType = data.file.contentType.split('/').shift()
     var d = new Date(parseInt( data.timestamp*1000))
     let strTime = d.toLocaleString(['en-US'], { hour: '2-digit', minute: '2-digit' });
     div.classList.add('file');

     if(contentType === 'image' && (ext!=='tiff' && ext!=='tif')){
         div.innerHTML = `<div class="create-message">
                <div class="file-info preview">
                <div><img src="${apiUrl}/${link}" alt="${data.file.fileName}">
                </div>
                <span class="time-message">${strTime}</span>
                </div>
                </div>`
     } else {
         div.innerHTML =  `<div class="create-message" >
 <div class="file-info">
       <div class="file-txt">${fileMessage(link,data.file.fileName,ext,'out')}</div>
       <span class="message-txt" >${urlify(escapeXml(data.file.fileName))}
       <span class="file-desc" style="display: block;">Document Size: ${humanFileSize(data.file.fileSize)}</span>
       </span>
       <span class="time-message">${strTime}</span>
       </div>
       </div>
</div>`
     }

     if(messageArea.children[messageArea.children.length-1] && messageArea.children[messageArea.children.length-1].classList.contains('out-message')){
         div.classList.add('add-out-top')
     }
     messageArea.appendChild(div)
 }

 function createFileMessageHistoryIn(data){
     var d = new Date(parseInt( data.timestamp*1000))
     let strTime = d.toLocaleString(['en-US'], { hour: '2-digit', minute: '2-digit' });
     var div = document.createElement('div');
     div.setAttribute("agent-id", data.senderId);
     div.classList.add('in-message');
    let username;
     if(!data.senderName) {
         username = data.senderId;
     } else {
         username = data.senderName;
     }
     let ext = data.file.fileName.split('.').pop();
     let link = `/newapi/config/user?command=cli_download_file&session=${webToken}&fileId=${data.fileId}`;
     let contentType = data.file.contentType.split('/').shift()

     if(contentType==='image' && (ext!=='tiff' && ext!=='tif')){
         div.innerHTML = `<div class="incom-message file" data-id="${data.messageId}" >
                         <span class="user-w">${createName(username)}</span>
                        <span class="agent-name">${data.senderName}</span>
                        <div class="in-message-text file-message" >
                         <div class="file-info preview">
        <div><img src="${apiUrl}/${link}" alt="${data.file.fileName}">
        </div>
        <span class="time-message">${strTime}</span>
        </div>
        </div>
         </div>`

     } else {
         div.innerHTML = `<div class="incom-message" data-id="${data.messageId}" >
                         <span class="user-w">${createName(username)}</span>
                        <span class="agent-name">${data.senderName}</span>
                        <div class="in-message-text file-message" >
                        <div class="file-info chat-txt">
        <div class="file-txt">${fileMessage(link, data.file.fileName, ext)}</div>
        <span class="message-txt" >${urlify(escapeXml(data.file.fileName))}
        <span class="file-desc" style="display: block;">Document Size: ${humanFileSize(data.file.fileSize)}</span>
        </span>
        <span class="time-message">${strTime}</span>
        </div> 
        </div>
         </div>`
     }
     if(messageArea.children[messageArea.children.length-1] && messageArea.children[messageArea.children.length-1].attributes['agent-id']!==undefined){
         if(messageArea.children[messageArea.children.length-1].attributes['agent-id'].value === data.senderId ){
             
             if(contentType==='image' && (ext!=='tiff' && ext!=='tif')){
                 div.innerHTML = `<div class="incom-message file" data-id="${data.messageId}" >
                         <div class="in-message-text file-message" >
                        <div class="file-info preview">
        <div><img src="${apiUrl}/${link}" alt="${data.file.fileName}">
        </div>
        <span class="time-message">${strTime}</span>
        </div>
        </div>
                    </div>`
             } else {
                 div.innerHTML = `<div class="incom-message" data-id="${data.messageId}" >
                         <div class="in-message-text file-message" >
                        <div class="file-info chat-txt">
        <div class="file-txt">${fileMessage(link, data.file.fileName, ext)}</div>
        <span class="message-txt" >${urlify(escapeXml(data.file.fileName))}
        <span class="file-desc" style="display: block;">Document Size: ${humanFileSize(data.file.fileSize)}</span>
        </span>
        <span class="time-message">${strTime}</span>
        </div> 
        </div>
                    </div>`
             }
             div.classList.add('add-m-top')
         }
     }
     messageArea.appendChild(div);

 }

function createNewFileMessageOut(fileInfo,objUrl){
    updateTime()
    var div = document.createElement('div')
    div.classList.add('out-message')
    let ext = fileInfo.name.split('.').pop();
    let contentType = fileInfo.type.split('/').shift()

    div.classList.add('file');

    if(contentType === 'image' && (ext!=='tiff' && ext!=='tif')){
        div.innerHTML = `<div class="create-message">
                    <div class="file-info preview">
                    <div><img src="${objUrl}" alt="${fileInfo.name}">
                    </div>
                    <span class="time-message">${strTime}</span>
                    </div>
                    </div>`
        // return html
    } else {
        div.innerHTML =  `<div class="create-message" >
     <div class="file-info">
           <div class="file-txt">${fileMessage(objUrl,fileInfo.name,ext,'out')}</div>
           <span class="message-txt" >${urlify(escapeXml(fileInfo.name))}
           <span class="file-desc" style="display: block;">Document Size: ${humanFileSize(fileInfo.size)}</span>
           </span>
           <span class="time-message">${strTime}</span>
           </div>
           </div>
    </div>`
    }



    if(messageArea.children[messageArea.children.length-1] && messageArea.children[messageArea.children.length-1].classList.contains('out-message')){
        div.classList.add('add-out-top')
    }
    clearOldStatus();
    messageArea.appendChild(div)
    updateScrollText()
}


function createNewFileMessage(direction,eventData,fileData){
    let scrolled;
    let username;
    if (chatRoom.scrollHeight - chatRoom.scrollTop === chatRoom.clientHeight)
    {
        scrolled = true;
    }

    var div = document.createElement('div');
    div.setAttribute("agent-id", eventData.fromId);
    div.classList.add('in-message');

    if(!eventData.fromName) {
        username = eventData.fromId;
    } else {
        username = eventData.fromName;
    }
    let ext = fileData.fileName.split('.').pop();
    let link = `/newapi/config/user?command=cli_download_file&session=${webToken}&fileId=${fileData.fileId}`;
    let contentType = fileData.contentType.split('/').shift()

    if(contentType==='image' && (ext!=='tiff' && ext!=='tif')){
        div.innerHTML = `<div class="incom-message file" data-id="${eventData.persistId}" >
                         <span class="user-w">${createName(username)}</span>
                        <span class="agent-name">${agent}</span>
                        <div class="in-message-text file-message" >
                         <div class="file-info preview">
        <div><img src="${apiUrl}/${link}" alt="${fileData.fileName}">
        </div>
        <span class="time-message">${eventData.time}</span>
        </div>
        </div>
         </div>`

    } else {
        div.innerHTML = `<div class="incom-message" data-id="${eventData.persistId}" >
                         <span class="user-w">${createName(username)}</span>
                        <span class="agent-name">${agent}</span>
                        <div class="in-message-text file-message" >
                        <div class="file-info chat-txt">
        <div class="file-txt">${fileMessage(link, fileData.fileName, ext)}</div>
        <span class="message-txt" >${urlify(escapeXml(fileData.fileName))}
        <span class="file-desc" style="display: block;">Document Size: ${humanFileSize(fileData.fileSize)}</span>
        </span>
        <span class="time-message">${eventData.time}</span>
        </div> 
        </div>
         </div>`
    }



    if(messageArea.children[messageArea.children.length-1] && messageArea.children[messageArea.children.length-1].attributes['agent-id']!==undefined){
        if(messageArea.children[messageArea.children.length-1].attributes['agent-id'].value === eventData.fromId ){

            if(contentType==='image' && (ext!=='tiff' && ext!=='tif')){
                div.innerHTML = `<div class="incom-message file" data-id="${eventData.persistId}" >
                         <div class="in-message-text file-message" >
                        <div class="file-info preview">
        <div><img src="${apiUrl}/${link}" alt="${fileData.fileName}">
        </div>
        <span class="time-message">${eventData.time}</span>
        </div>
        </div>
                    </div>`
            } else {
                div.innerHTML = `<div class="incom-message" data-id="${eventData.persistId}" >
                         <div class="in-message-text file-message" >
                        <div class="file-info chat-txt">
        <div class="file-txt">${fileMessage(link, fileData.fileName, ext)}</div>
        <span class="message-txt" >${urlify(escapeXml(fileData.fileName))}
        <span class="file-desc" style="display: block;">Document Size: ${humanFileSize(fileData.fileSize)}</span>
        </span>
        <span class="time-message">${eventData.time}</span>
        </div> 
        </div>
                    </div>`
            }


            div.classList.add('add-m-top')
        }
    }


    messageArea.appendChild(div);
    if(scrolled){
        updateScrollText();
    }

}

function createHistorySysMessage(data){
    let d = new Date(parseInt(data.timestamp*1000))
    let strTime = d.toLocaleString(['en-US'], { hour: '2-digit', minute: '2-digit' });
    let node = document.createElement("DIV");
    node.setAttribute('class','system-messages');
    node.style.clear = 'both';
    node.innerHTML = `<span class="time-info"> ${strTime}</span> <span>${data.body}</span>`
    if(chatState === 'connecting'){
        connectAgent.appendChild(node)
    } else {
        messageArea.appendChild(node)
    }
}

function createHistoryMessage(type,data){
    if(type==='out'){
        var d = new Date(parseInt( data.timestamp*1000))
        let strTime = d.toLocaleString(['en-US'], { hour: '2-digit', minute: '2-digit' });

        var div = document.createElement('div')
        div.classList.add('out-message')
        div.innerHTML = `<div class="incom-message" >
        
        <div class="out-message-text">
        <p class=""><span >${data.body}</span>
        <span class="time-message">${strTime}</span></p>
        </div>
        </div>`
        if(messageArea.children[messageArea.children.length-1] && messageArea.children[messageArea.children.length-1].classList.contains('out-message')){
            div.classList.add('add-out-top')
        }
        messageArea.appendChild(div)
    } else if(type==='in'){
        var d = new Date(parseInt( data.timestamp*1000))
        let strTime = d.toLocaleString(['en-US'], { hour: '2-digit', minute: '2-digit' });
        let scrolled;
        let username;
        if (chatRoom.scrollHeight - chatRoom.scrollTop === chatRoom.clientHeight)
        {
            scrolled = true;
        }
        var div = document.createElement('div');
        div.setAttribute("agent-id", data.senderId);
        div.classList.add('in-message');
        if(!data.senderName) {
            username = data.senderId;
        } else {
            username = data.senderName;
        }

        div.innerHTML = `<div class="incom-message" data-id="${data.messageId}" >
                         <span class="user-w">${createName(data.senderName)}</span>
                        <span class="agent-name">${data.senderName}</span>
                        <div class="in-message-text" >
                            <p class="chat-txt"><span class="message-txt">${data.body}</span>
                                <span class="time-message">${strTime}</span>
                            </p>
                                <!--<span class="time-message">05:56 PM</span>-->
                        </div>
                    </div>`

        if(messageArea.children[messageArea.children.length-1] && messageArea.children[messageArea.children.length-1].attributes['agent-id']!==undefined){
            if(messageArea.children[messageArea.children.length-1].attributes['agent-id'].value === data.senderId ){
                
                div.innerHTML = `<div class="incom-message" data-id="${data.messageId}" >
                        <div class="in-message-text" >
                            <p class="chat-txt"><span class="message-txt">${data.body}</span>
                                <span class="time-message">${strTime}</span>
                            </p>
                                <!--<span class="time-message">05:56 PM</span>-->
                        </div>
                    </div>`
                div.classList.add('add-m-top')
            }
        }

        messageArea.appendChild(div);
        if(scrolled){
            updateScrollText();
        }
    }
    else if(type==='sys'){

    }

}


function createNewChatMessage(type,data,history) {
    if(type==='out'){
        updateTime()
        var div = document.createElement('div')
        div.classList.add('out-message')
        div.innerHTML = `<div class="incom-message" >
        <div class="out-message-text">
        <p class=""><span >${textArea.value}</span>
        <span class="time-message">${strTime}</span></p>
        </div>
        </div>`

        if(messageArea.children[messageArea.children.length-1] && messageArea.children[messageArea.children.length-1].classList.contains('out-message')){
            div.classList.add('add-out-top')
        }
        messageArea.appendChild(div)
        textArea.value = '';
        clearOldStatus();
    } else {
        let scrolled;
        let username;
        if (chatRoom.scrollHeight - chatRoom.scrollTop === chatRoom.clientHeight)
        {
            scrolled = true;
        }
        var div = document.createElement('div');
        div.setAttribute("agent-id", data.fromId);
        div.classList.add('in-message');
        if(!data.fromName) {
            username = data.fromId;
        } else {
            username = data.fromName;
        }
        div.innerHTML = `<div class="incom-message" data-id="${data.persistId}" >
                         <span class="user-w">${createName(username)}</span>
                        <span class="agent-name">${agent}</span>
                        <div class="in-message-text" >
                            <p class="chat-txt"><span class="message-txt">${urlify(data.msg)}</span>
                                <span class="time-message">${data.time}</span>
                            </p>
                        </div>
                    </div>`

        if(messageArea.children[messageArea.children.length-1] && messageArea.children[messageArea.children.length-1].attributes['agent-id']!==undefined){
            if(messageArea.children[messageArea.children.length-1].attributes['agent-id'].value === data.fromId ){
                div.innerHTML = `<div class="incom-message" data-id="${data.persistId}" >
                        <div class="in-message-text" >
                            <p class="chat-txt"><span class="message-txt">${urlify(data.msg)}</span>
                                <span class="time-message">${data.time}</span>
                            </p>
                        </div>
                    </div>`
                div.classList.add('add-m-top')
            }
        }


        messageArea.appendChild(div);
        if(scrolled){
            updateScrollText();
        }
    }
}

function removeErrorMessages(i){
    i.srcElement.classList.remove("border-red-500");
    errorMessage.style.visibility = 'hidden'
}

sendChatBtn.addEventListener('click',function () {
    if(!textArea.value || !textArea.value.trim()){
        textArea.value = '';
        return
    }

    updateTime ();
    wsClient.sendMessage(textArea.value,roomId,customName.value);
    createNewChatMessage('out',textArea.value);
    updateScrollText();
    sendChatBtn.firstElementChild.src = '/chat/img/send.svg';
})

textArea.addEventListener("keydown", function(event) {
    if (event.keyCode == 13 && !event.shiftKey) {
        if(!textArea.value || !textArea.value.trim()){
            textArea.value = '';
            event.preventDefault()
            return
        }
        updateTime ();
        wsClient.sendMessage(textArea.value,roomId,customName.value);
        createNewChatMessage('out',textArea.value);
        updateScrollText();
        sendChatBtn.firstElementChild.src = '/chat/img/send.svg';
        event.preventDefault()
    }
});

textArea.onkeyup = function (e) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        wsClient.sendStatus('IMS_TYPING','',persistId,'','','WebChat','',customName.value,roomId, timestamp,false,mxGroupName);
        typing = true;
    }, 500);

};

textArea.addEventListener("input", function (e) {
    if(typing){
        wsClient.sendStatus('IMS_TYPING','',persistId,'','','WebChat','',customName.value,roomId, timestamp,true,mxGroupName);
    }
    if(textArea.value === '') {
        sendChatBtn.firstElementChild.src = '/chat/img/send.svg';
    } else {
        sendChatBtn.firstElementChild.src = '/chat/img/sending.svg';
    }
    typing = false;

});

 function uploadFile(file,sessionToken){
     let tempMessageId = Math.floor(Math.random() * 10000 + 1);
     let fileData = {
         tmpMsgId:tempMessageId,
         direction:'outgoing',
         chatId:roomId,
         chatType:'agentwebchat',
         name: encodeURIComponent(file.name)
     }
     let blob = new Blob([file], {type: file.type});

     let objectUrl = URL.createObjectURL(blob);
     createNewFileMessageOut(file,objectUrl)
     let formData = new FormData()
     formData.append('', blob);
     fetch(`${apiUrl}/newapi/upload/files`, { 
         method: 'POST',
         headers: {
             "Accept": 'application/json, text/plain, */*',
             "Content-Type": "application/x-www-form-urlencoded",
             'wwwcommand':"cli_upload_file",
             'wwwsession':sessionToken,
             'wwwdata': JSON.stringify(fileData)
         },
         body: blob 
     }).then(
         response => response.json() 
     ).
     then(function (data) {
             if(data.error){
                 console.log(data)
             }
         }
     )
         .catch(
             error => console.log(error) 
         );
 }

 fileUploadHtml.onchange = function (e) {

         let maxFSize = parseInt(maxFileSize) *Math.pow(1024, 2);
         Array.prototype.forEach.call(e.target.files,(function (item,index) {
             if(item.size>maxFSize){
                 setTimeout(function(){
                     showNotifications(`File ${item.name} is too large
  Maximum allowed file size is ${maxFileSize} Mb`)
                 }, index * 1000);
             } else {
                 uploadFile(item,webToken)
             }
         }))

     }

 function getFileInfo(sessionToken,messageId,type) {

     return new Promise(function(resolve, reject) {
         var xhr = new XMLHttpRequest();
         let url;
             url = `${apiUrl}/newapi/config/user?command=cli_get_files&session=${sessionToken}&chatId=${roomId}&chatType=${type}&messageId=${messageId}`

         xhr.open('GET', url, true);

         xhr.onload = function() {
             if (this.status === 200) {
                 resolve(this);
             } else {
                 var error = new Error(this.statusText);
                 error.code = this.status;
                 reject(error);
             }
         };
         xhr.onerror = function() {
             reject(new Error("Network Error"));
         };
         try {
             xhr.send()
         }
         catch (e) {
             console.log(e);
         }
     });
 }

 function getChatHistory(sessionToken,chatType) {
     return new Promise(function(resolve, reject) {
         var xhr = new XMLHttpRequest();
         let url = `${apiUrl}/newapi/config/user?command=cli_get_history_party&session=${sessionToken}&partyId=${roomId}&page=${1}&limit=100&chatType=${chatType}&sort=+timestamp`
         xhr.open('GET', url, true);

         xhr.onload = function() {
             if (this.status === 200) {
                 resolve(this);
             } else {
                 var error = new Error(this.statusText);
                 error.code = this.status;
                 reject(error);
             }
         };
         xhr.onerror = function() {
             reject(new Error("Network Error"));
         };
         try {
             xhr.send()
         }
         catch (e) {
             
         }
     });
 }



let resizeHandle = document.getElementById('resizable');
resizeHandle.addEventListener('mousedown', initialiseResize, false);
let original_width = 0;
let original_height = 0;
const minimum_size = 300;
const minimum_height = 450;
let original_x = 0;
let original_y = 0;
let original_mouse_x = 0;
let original_mouse_y = 0;

function initialiseResize(e) {
    e.preventDefault()
    original_width = parseFloat(getComputedStyle(webChat, null).getPropertyValue('width').replace('px', ''));
    original_height = parseFloat(getComputedStyle(webChat, null).getPropertyValue('height').replace('px', ''));
    original_x = webChat.getBoundingClientRect().left;
    original_y = webChat.getBoundingClientRect().top;
    original_mouse_x = e.pageX;
    original_mouse_y = e.pageY;
    window.addEventListener('mousemove', startResizing, false);
    window.addEventListener('mouseup', stopResizing, false);
}

function stopResizing(e) {
    checkElementViewability()
    window.removeEventListener('mousemove', startResizing, false);
    window.removeEventListener('mouseup', stopResizing, false);
}
//
 function showModalImg(src,alt){
     modal.classList.add('showing')
     var str = src;
     var res = str.replace("type=preview", "type=original");
     modalImg.src = res;
     captionText.innerHTML = window.document.title;
 }

 function hideModal(){
     modal.classList.remove('showing')
 }
 function showFullImage(event) {

     if(event.target.nodeName === 'IMG' && !event.target.parentNode.classList.contains('send-chat')){
         event.stopPropagation();
         showModalImg(event.target.src)
     }
 }


function startResizing(e) {
    const width = original_width - (e.pageX - original_mouse_x)
    const height = original_height - (e.pageY - original_mouse_y)
    if (width >= minimum_size) {
        webChat.style.width = width + 'px'
    }
    if (height >= minimum_size && height >= minimum_height) {
        webChat.style.height = height + 'px'
        chatRoom.style.height = height - 149 + 'px';
    }
}

function startChatting(){
    if(!customName.value){
        return
    }
    setupWS()
    chatLeft.style.display = 'none';
    textArea.value = '';
    clearOldSystemMessage()
    
}

function hideChat() {
    chatActive = !chatActive
    if(!chatActive) {
        if(chatNotification.firstElementChild.innerHTML === ''){
            chatNotification.style.display ='none';
        } else {
            chatNotification.style.display ='block';
        }
        webChat.style.display ='none';
    } else {
        chatNotification.firstElementChild.innerHTML = '';
        webChat.style.display ='block';
        chatNotification.style.display ='none';
    }
}

function showModal() {
    modalBox.style.display = 'block';
}

function showModalReconnect() {
    //Just reconnect //!!
    continueChatSession();
     //reconnectModal.style.display = 'block'; //!!
 }

function closeModal() {
    modalBox.style.display = 'none';
}

function stopChat() {
    closeModal();
    chatError();
    chatLeft.style.display = 'none';
    chatRoom.classList.remove('visible')
    chatState = 'restarted'
    customName.value = '';
    messageArea.innerHTML = '';
    localStorage.removeItem('webchat');
    [].forEach.call(document.querySelectorAll('.system-m'),function(e){
        e.parentNode.removeChild(e);
    });
    clearOldSystemMessage()
    wsClient.sendStatus('IMS_WC_CANCELLED', '', '', '', '', 'WebChat', '', customName.value, roomId, timestamp);
    try {
        ws.close();
    } catch (ee) {

    }
    
    hideChat();
}

function continueChatSession(){
    getChatHistory(webToken, 'agentwebchat').then(function (data) {
        let history = JSON.parse(data.response).chatHistoryList;
        history.forEach(function (item) {
            if (item.direction === 'incoming' && item.messageType === 'msg') {
                createHistoryMessage('in', item)
            } else if (item.direction === 'outgoing' && item.messageType === 'msg') {
                createHistoryMessage('out', item)
            } else if(item.messageType === 'sys'){
                createHistorySysMessage(item)
            } else if(item.direction === 'outgoing' && item.messageType === 'file') {
                createFileMessageHistoryOut(item)
            } else if(item.direction === 'incoming' && item.messageType === 'file'){
                createFileMessageHistoryIn(item)
            }
        })


    }).catch(function (err) {
        console.log(err)
    })
    keepAlive()
    setTimeout(function () {
        hideConnectState()
        chatSpace.style.display = 'block';
        messageBox.style.pointerEvents = 'all';
        updateScrollText();  //!!
    },1500)
    reconnectModal.style.display = 'none';
    
}

     function restartChat() {
         clearOldSystemMessage()
         closeModal();
         chatError();
         chatLeft.style.display = 'none';
         customName.value = '';
         reconnectModal.style.display = 'none';
         localStorage.removeItem('webchat');
         webToken = '';
         messageArea.innerHTML = '';
         [].forEach.call(document.querySelectorAll('.system-m'),function(e){
             e.parentNode.removeChild(e);
         });
         wsClient.sendStatus('IMS_WC_CANCELLED','','','','','WebChat','',customName.value,roomId, timestamp);
         ws.close();
     }


function chatError(){
    chatRoom.classList.remove('visible')
    startChatBlock.style.display = 'block';
    connectAgent.classList.remove('visible');
    messageBox.style.display = 'none';
    chatSpace.style.display = 'none';
}


customName.addEventListener("keydown", function(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
        startChatting();
    }
})
document.querySelector("div.cursor-hand").addEventListener('click',hideModal)
chatRoom.addEventListener("click",showFullImage);
chatRoom.addEventListener("scroll", checkElementViewability);
declineChat.addEventListener('click',restartChat);
leaveChat.addEventListener('click',stopChat);
startNewChat.addEventListener('click',restartChat);
modalClose.addEventListener('click',closeModal);
closeChat.addEventListener('click', showModal);
     try {
         chatIcon.forEach(chatIcon => chatIcon.removeEventListener("click", leaveMessage));
     } catch (e) {

     }
chatIcon.forEach(chatIcon => chatIcon.addEventListener("click", hideChat));
collapseChat.addEventListener('click',hideChat);
continueChat.addEventListener('click',continueChatSession);
startChat.addEventListener('click',startChatting);
})()