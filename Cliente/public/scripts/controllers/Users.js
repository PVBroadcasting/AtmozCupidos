function Userattrib(boxs,state,bodytype,haircolor,eyecolor,height,weight,smoker,alcohol,describe){
  this.Boxs=boxs;
  this.State=state ? state : "";
  this.Bodytype=bodytype ? bodytype : "";
  this.Haircolor=haircolor ? haircolor : "";
  this.Eyecolor=eyecolor ? eyecolor : "";
  this.Height=height ? height : "";
  this.Weight=weight ? weight : "";
  this.Smoker=smoker ? smoker : "";
  this.Alcohol=alcohol ? alcohol : "";
  this.Describe=describe ? describe : "";
}

function User(name,nickname,codigo,age,online,picProfile,pictures,picturesp,country,region,languange,sex,seeking){
  this.Name= name ? name : "";
  this.Codigo = codigo ? codigo : "";
  this.Online= online ? online : false;
  this.PictureProfile = picProfile ? picProfile : "";
  this.Pictures = pictures ? pictures : "";
  this.PicturePrivate=picturesp ? picturesp : "";
  this.Nickname=nickname ? nickname : "";
  this.Age=age ? age : "";
  this.Country=country ? country : "";
  this.Region=region ? region : "";
  this.Languange=languange ? languange : "";
  this.Sex=sex ? sex : "";
  this.Seeking=seeking ? seeking : "";
}
// Exporting variables and functions
export {User, Userattrib};
