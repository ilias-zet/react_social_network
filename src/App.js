import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

var user=""
var post = ""
var heart='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/230/white-heart_1f90d.png'
var commentIcon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/274/speech-balloon_1f4ac.png"
var zerman='https://pbs.twimg.com/profile_images/1089301032843337729/zbl-6pub_400x400.jpg'
var guestPic='https://pbs.twimg.com/media/EWAJB4WUcAAje8s.png'
var maxId=0; // максимальный id публикации
var maxUserId=0; // максимальный id пользователя
var newDate = new Date()
// список пользователей
var users = [{
  id:-1,
  name:"Guest",
  avatar:guestPic,
  status:"unsigned",
},
{id:0,
  email:"iliaszerman@gmail.com",
  name:"Ilias Zerman",
  password:"0000",
  status:"status",
  avatar:zerman,
}]
var logedUser = users[1] // Текущий авторизованный пользователь
var postArr = [{
    authorId:0,
    id:0,
    title:"SPA Example",
    img:"https://thepsychologist.bps.org.uk/sites/thepsychologist.bps.org.uk/files/img_9685.jpg",
    text:"Здесь можно добавить публикацию",
    date:new Date(),
    likes:228,
    comments:[{
      author:users[1],
      text:'А тут можно написать какой-нибудь комментарий',
      date:newDate.toLocaleString(),
    }]
}]
const App = () =>{
  const [isLoged,setLogValue] = React.useState("isLoged")
  function returnLogValue(value){
    setLogValue(value)
  }
  return(<div>
      <Header returnLogValue={returnLogValue}/>
      <Body isLoged={isLoged} setLogValue={setLogValue}/>
    </div>)
}
const Header =({returnLogValue}) => {
  const [isLoged,setLogValue] = React.useState("isLoged")
  returnLogValue(isLoged)
    return (
      <div className="header">
        <div className="header-title">Dungeon master.org</div>
        <UserSwitch isLoged={isLoged} setLogValue={setLogValue}/>
      </div>
    );
}
const UserSwitch = ({isLoged,setLogValue}) =>{
  function registerButtonClick(){
    let username = document.getElementById("username").value
    let email = document.getElementById("email").value
    let password1 = document.getElementById("pass1").value
    let password2 = document.getElementById("pass2").value
    let lastUserId = users[users.length-1].id
    let email_is_free=true;
    if(password1==password2){
      for(user of users){
        if(user.email==email){
          email_is_free=false
          alert("Пользователь с таким адресом электронной почты уже зарегистрирован!")
        }
      }
      if(email_is_free){
        maxUserId+=1
        users.push({
          id:maxUserId,
          email:email,
          name:username,
          password:password1,
          status:"",
          avatar:guestPic,
        })
        alert("Регистрация прошла успешно!")
        setLogValue("unloged")
      }
    }
    else alert("Введенные пароли не совпадают!")
  }
  function loginButtonClick(){
    let email = document.getElementById("email").value
    let password = document.getElementById("pass").value
    let lastUserId = users[users.length-1].id
    for(user of users){
      if(user.email==email&&user.password==password){
        alert("Вы вошли как "+user.name)
        logedUser = user;
        setLogValue("isLoged")
      }
      else if(user.id==lastUserId){
        alert("Данные введены неверно!")
        document.getElementById("pass").value=""
      }   
    }
  }
  switch(isLoged){
    case "unloged":{
      return(
        <div className="user-switch">
          <button onClick={() => {setLogValue("loginForm")}}>Login</button>
          <button onClick={() => {setLogValue("registerForm")}}>Register</button>
        </div>)
    };break;
    case "loginForm":{
      return(
        <div className="darkbg">
          <div className="login-form">
            <div className="login-form-header">Авторизация</div>
            <div className="login-form-body">
              <input type="text" id="email" placeholder="e-mail"/>
              <input type="password" id="pass" placeholder="Пароль"/>
              <button onClick={()=>{loginButtonClick()}}>Войти</button>
              <button onClick={()=>{setLogValue("unloged")}}>Отмена</button>
            </div>
          </div>
        </div>)
    }
    case "registerForm":{
      return(
        <div className="darkbg">
          <div className="login-form r">
            <div className="login-form-header">Регистрация</div>
            <div className="login-form-body r">
              <input type="text" id="username" placeholder="Имя пользователя"/>
              <input type="text" id="email" placeholder="e-mail"/>
              <input type="password" id="pass1" placeholder="Пароль"/>
              <input type="password" id="pass2" placeholder="Повтор пароля"/>
              <button onClick={()=>{registerButtonClick()}}>Регистрация</button>
              <button onClick={()=>{setLogValue("unloged")}}>Отмена</button>
            </div>
          </div>
        </div>)
    }
    case "isLoged":{
      return(<div className="logoutBox">
          <div>{logedUser.name}</div>
          <img className="post-author-image h" src={logedUser.avatar}/>
          <button className="logoutButton" 
            onClick={() =>{
              if(Window.confirm("Вы уверены, что хтите выйти?")){
                setLogValue("unloged")
                logedUser=users[0]
              }}}>Выйти</button>
      </div>)
    }
  }
}
const Navigation = ({isLoged}) =>{
  if(isLoged=="isLoged"){return(
    <div className="navigation">
        <button>Моя страница</button>
        <button>Новости</button>
        <button>Фотогрфии</button>
        <button>Видео</button>
        <button>Группы</button>
        <button>Музыка</button>
        <button>Приложения</button>
    </div>
  )}
  else return(<div></div>)
}
const Body = ({isLoged,setLogValue}) =>{
  const [posts,setPosts] = React.useState(postArr)
  function update(){
        setPosts([...postArr]);
  }

  return(
    <div className="page-body">
      <Navigation isLoged={isLoged}/>
      <div>
        <UserInfo isLoged={isLoged} setLogValue={setLogValue}/>
        <AddPost isLoged={isLoged} update={update}/>
        <Content update={update} posts={posts}/>
      </div>
    </div>
  )
}
const AddPost = ({update,isLoged}) =>{
  var image=""
  function inputOnChange(){
    var inputImg = document.getElementById("input-image-post").files[0]
    var reader = new FileReader()
    reader.readAsDataURL(inputImg)
    reader.onload = () =>{
      image = reader.result
    }
  }
  function addPost(){
    var date = new Date()
    maxId++
    let postTitle = document.getElementById('add-post-title').value;
    let postText = document.getElementById('add-post-text').value;
    postArr.push({
      authorId:logedUser.id,
      id:maxId,
      title:postTitle,
      img:image,
      text:postText,
      date:date,
      likes:0,
      comments:[],
               })
    document.getElementById('add-post-title').value = ""
    document.getElementById('add-post-text').value = ""
    alert("Запись успешно опубликована!")
    update()
    }
  if(isLoged=="isLoged"){
    return (
    <div className="post-editor">
      <textarea id="add-post-title" rows="1" className='add-post-text' placeholder='Заголовок'/>
      <textarea id="add-post-text" rows="3" className="add-post-text" placeholder="Текст"/>
      <button onClick={addPost}>Опубликовать</button>
      <label><input className="userPic-upload" id="input-image-post" onChange = {()=>inputOnChange()} type="file"/>Прикрепить изображение</label>
    </div>
  )}
  else return(<div></div>)
}
const UserInfo = ({isLoged,setLogValue}) =>{
  function inputOnChange(){
    var inputImg = document.getElementById("input-image-avatar").files[0]
    alert(inputImg)
    var reader = new FileReader()
    reader.readAsDataURL(inputImg)
    reader.onload = () =>{
      logedUser.avatar = reader.result
      setLogValue('')
    }
  }
  if(isLoged!="isLoged"){
    return(
      <div className="userInfo">
          <b>Войдите&nbsp;</b> в свой профиль, чтобы сделать публикацию
      </div>
    )}
  else{
  return(<div className='userInfo'>
      <div>
        <div className='userPic'>
          <img src={logedUser.avatar}/>
        </div>
        <label class="userPic-upload">
          <div>
            Сменить изображение
          </div>
          <input type="file" id="input-image-avatar" accept="image/*" onChange={()=>{inputOnChange()}}/>
          
        </label>
      </div>
      <div className='profile-title'>
        <div className='userName'>{logedUser.name}</div>
        <input className="status" type="text" value={logedUser.status}/>
      </div>
  </div>)}
}
const Content = ({posts,update}) =>{
  const commentButtonClick = (id,text,date) =>{
    for(post of posts){
      if(post.id==id){
        post.comments.push({
          author:logedUser,
          text:text,
          date:date.toLocaleString(),
        })
        update()
      }
      
    }
  }
  const likeButtonClick = (id) =>{
    for(post of posts){
      if(post.id==id){
        post.likes+=1;
        update()
      }
      
    }
  }
  return posts.map((post)=>{
    return(<Post 
             commentButtonClick={commentButtonClick}
             likeButtonClick={likeButtonClick}
             authorId={post.authorId}
             id={post.id}
             title={post.title} 
             img={post.img}
             text={post.text} 
             likes={post.likes}
             date={post.date}
             comments={post.comments}/>)
  })
}
const Post = ({commentButtonClick,likeButtonClick,authorId,id,title,img,text,likes,date,comments}) =>{
  function returnComments(){
    return comments.map((comment) =>{
      return(<Comment
               author={comment.author}
               text={comment.text}
               date={comment.date}/>)
    })
  }
  var postAuthor
  var user=""
  for(user of users){
    if(user.id == authorId)
      postAuthor = user
  }
  return(
    <div className="post">
      <div className="post-author">
        <div className="post-author-image">
          <img src={postAuthor.avatar}/>
        </div>
        <a href="#" className="post-author-username">{postAuthor.name}</a>
        <div className="post-date">{date.toLocaleString()}</div>
      </div>
      <div className="post-title">{title}</div>
      <img className="post-image" src={img}/>
      <div className="post-text">{text}</div>
      <br/>
      <div>
        <button className="feedbacks" onClick={()=>{likeButtonClick(id)}}>
          {likes} <img src={heart} width="12px"/>
        </button>
        <button className="feedbacks" onClick={()=>{}}>
          {comments.length} <img src={commentIcon} width="12px"/>
        </button><hr/>
        {returnComments()}
        <AddComment commentButtonClick={commentButtonClick} id={id}/>
      </div>
    </div>
  )
}
const Comment = ({author,text,date}) =>{
  return (<div className="comment-box">
          <div className="comment">
            <img class="comment-author-image" src={author.avatar} />
            <a href="#"><b className="comment-author">{author.name}</b></a><br/><text className="comment-text">{text}</text>
            <div className="comment-date">{date}</div>
          </div>
        </div>
         )
}
const AddComment = ({commentButtonClick,id}) =>{
  return(
    <div className="add-comment-box">
      <textarea id={"comment-text"+id} className="add-comment" placeholder="Оставьте комментарий"/>
      <button 
        className="comment-button" 
        onClick={() =>{
          let date = new Date()
          let text = document.getElementById("comment-text"+id).value
          commentButtonClick(id,text,date)
          document.getElementById("comment-text"+id).value = ""
        }}>Отправить</button>
    </div>
    
  )
}

export default App;
