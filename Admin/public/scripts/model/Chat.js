function Chat(userEmi,usertarge,name,answered, view,operador,lastmessage,lasttime,createby,createTime,check){
  this.UserEmi= userEmi;
  this.Usertarge = usertarge;
  this.name= name ? name : "";
  this.answered= answered ? answered :false;
  this.view= view ? view : false;
  this.check= check ? check : false;
  this.operador= operador ? operador : "";
  this.Lastmessage = lastmessage ? lastmessage : false;
  this.Lasttime = lasttime ? lasttime: "";
  this.Createby = createby ? createby: "";
  this.CreateTime = createTime ? createTime :"";
}