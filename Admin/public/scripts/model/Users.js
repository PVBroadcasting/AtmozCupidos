function User(nickname,correo,type,name,online,points,age,lasttime,createby,createTime,picProfile,pictures,picturesp,country,region,languange,sex,
  seeking,boxs,codigo,state,bodytype,haircolor,eyecolor,height,weight,smoker,describe){
  this.correo= correo ? correo : "";
  this.Nickname=nickname ? nickname : "";
  this.Online= online ? online : false;
  this.PictureProfile = picProfile ? picProfile : "";
  this.Pictures = pictures ? pictures : "";
  this.PicturePrivate=picturesp ? picturesp : "";
  this.Age=age ? age : "";
  this.Points = points ? points : 0;
  this.Country=country ? country : "";
  this.Region=region ? region : "";
  this.Languange=languange ? languange : "";
  this.Sex=sex ? sex : "";
  this.Seeking=seeking ? seeking : "";
  this.Boxs=boxs ?boxs :"";
  this.Codigo = codigo ? codigo : "";
  this.State=state ? state : "";
  this.Bodytype=bodytype ? bodytype : "";
  this.Haircolor=haircolor ? haircolor : "";
  this.Eyecolor=eyecolor ? eyecolor : "";
  this.Height=height ? height : "";
  this.Weight=weight ? weight : "";
  this.Smoker=smoker ? smoker : "";
  this.Describe=describe ? describe : "";
  this.Name= name ? name : "";
  this.Type = type ? type: "";
  this.Lasttime = lasttime ? lasttime: "";
  this.Createby = createby ? createby: "";
  this.CreateTime = createTime ? createTime :"";
}
// Exporting variables and functions
export {User};
