function Messager(content,createby,Usertarge,chatid,createTime,view,check){
  this.Content = content ? content : "";
  this.check = check ? check : false;
  this.view = view ? view : false; "";
  this.Createby = createby ? createby: "";
  this.Usertarge = Usertarge ? Usertarge: "";
  this.chatid = chatid ? chatid : "";
  this.CreateTime = createTime ? createTime :"";
}
