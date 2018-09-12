const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");

client.on("ready", () => {
  let canalotavio = 'https://www.youtube.com/c/otaviotm'
  let canaltwitch = 'nd'
  let convitesv = ' '
  console.log(`BotTM by Joaodeoliveira (Hanni) Iniciado com sucesso; ${client.users.size} usúarios no servidor!`); 
  client.user.setPresence({status: 'dnd', game: { name: `Help b! `, type: 1 } })
  client.user.setPresence({status: 'dnd', game: { name: `15 usuarios`, type: 3 } });
  
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  if (message.channel.type === "dm") {
	  message.reply("Não respondo mensagens por **dm**, mas você pode falar comigo pelo servidor! discord.gg/3mGCETx Canal do Youtube: __Otaviotm__ https://www.youtube.com/c/otaviotm Bot by OtavioTM contato: https://discord.me/otaviotm");
	
  }
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Ping = ${m.createdTimestamp - message.createdTimestamp}ms. API Ping = ${Math.round(client.ping)}ms`);
  }
  
  if(command === "fale") {
	  
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
	
	if(!message.member.roles.some(r=>["💎Dono Geral 💎", "✠ Sub Dono ✠ ", "👥 Administrador 👥"].includes(r.name)) )
      return message.reply("Não!");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage, {
 tts: true
});
  }
  if(command === "kickar") {
	  
	  message.delete().catch(O_o=>{});
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["💎Dono Geral 💎", "✠ Sub Dono ✠ ", "👥 Administrador 👥", "👥 Moderador 👥"].includes(r.name)) )
      return message.reply("Desculpe, Você não tem permição para usar isto!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Por favor mencione um membro válido deste servidor");
    if(!member.kickable) 
      return message.reply("Não posso kickar esta pessoa! Ele tem um cargo mais alto que o meu? Eu tenho permições para expulsar?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Nenhuma razão especificada";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Desculpe ${message.author} eu não posso kickar ${member.user.tag} por : ${error}`));
    message.reply(`${member.user.tag} foi kickado por ${message.author.tag} por: ${reason}`);

  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
	message.delete().catch(O_o=>{});
	
    if(!message.member.roles.some(r=>["💎Dono Geral 💎", "✠ Sub Dono ✠ ", "👥 Administrador 👥"].includes(r.name)) )
      return message.reply("Desculpe, você não tem permição para usar isto!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Por favor mencione um membro válido deste servidor");
    if(!member.bannable) 
      return message.reply("Eu não posso banir este usuario! Ele tem um cargo mais alto que o meu? Eu tenho permições para banir?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Nenhuma razão especificada";
    
    await member.ban(reason)
      .catch(error => message.reply(`Desculpe ${message.author} eu não posso banir ${member.user.tag} por : ${error}`));
    message.reply(`${member.user.tag} foi banido por ${message.author.tag} por: ${reason}`);
  }

  if(command === "limpar") {
    // This command removes all messages from all users in the channel, up to 1000.
	if(!message.member.roles.some(r=>["💎Dono Geral 💎", "✠ Sub Dono ✠", "⚒ Desenvolvedor Discord ⚒", "✘ Diretor ✘", "♛ Gerente ♛", "👥 Administrador 👥", "👥 Moderador 👥"].includes(r.name)) )
      return message.reply("Desculpe, Você não tem permição para usar isto!");
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
	
    message.delete().catch(O_o=>{});
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Por favor especifique um número de 2 á 100 para a quantidade de mensagens á serem deletadas");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Não posso deletar mensagens porque: ${error}`));
  }

});
client.login(config.token);
           