const bot = require('bbot')

// 1. Text Button With Url
bot.global.text(/text button with url/i, (b) => {
  b.envelope.write('text button with url')
  b.envelope.payload.quickReply({
      text: 'Book flights',
      url: 'http://www.kayak.com',
      is_webview: false
  })
  return b.respond().catch((err) => console.error(err))
})

// 2. Text Button With Msg in Chat Window
bot.global.text(/text button with msg in chat window/i, (b) => {
  b.envelope.write('text button with msg in chat window')
  b.envelope.payload.quickReply({ 
    content: 'hello (message sent via RichMessageBot) :D',
    text: 'hello in chat window',
  })
  return b.respond().catch((err) => console.error(err))
})

// 3. Image Button With Url
bot.global.text(/image button with url/i, (b) => {
  b.envelope.write('image button with url')
  b.envelope.payload.quickReply({
      image_url: 'http://www.emoji.co.uk/files/phantom-open-emojis/travel-places-phantom/12698-airplane.png',
      url: 'http://www.kayak.com'
  })
  return b.respond().catch((err) => console.error(err))
})

// 4. Image Button With Msg in Chat Window
bot.global.text(/image button with msg in chat window/i, (b) => {
  b.envelope.write('image button with msg in chat window')
  b.envelope.payload.quickReply({ 
    image_url: 'http://www.emoji.co.uk/files/phantom-open-emojis/travel-places-phantom/12698-airplane.png',
    msg: 'I clicked the airplane'
  })
  return b.respond().catch((err) => console.error(err))
})

// 5. Multiple Text Buttons
bot.global.text(/multiple text buttons/i, (b) => {
  b.envelope.write('Multiple buttons:')
  b.envelope.attach({
    title: 'Multiple text buttons with url'
  })
  b.envelope.payload.quickReply({
    type: 'button',
    text: 'Book flights',
    url: 'http://www.kayak.com',
    is_webview: false
  })
  b.envelope.payload.quickReply({
    type: 'button',
    text: 'Cancel travel request',
    url: 'https://requests.example.com/cancel/r123456',
    is_webview: false
  })
  return b.respond().catch((err) => console.error(err))
})  

// 6. Horizontal Text Buttons
bot.global.text(/horizontal text buttons/i, (b) => {
  b.envelope.write('Horizontal buttons:')
  b.envelope.attach({ 
    title: 'horizontal text buttons with url',
    button_alignment: 'horizontal'
  })
  b.envelope.payload.quickReply({
    type: 'button',
    text: 'Book flights',
    url: 'http://www.kayak.com',
    is_webview: false
  })
  b.envelope.payload.quickReply({
    type: 'button',
    text: 'Cancel travel request',
    url: 'https://requests.example.com/cancel/r123456',
    is_webview: false
  })
  return b.respond().catch((err) => console.error(err))
})

// 7 & 8 deferred

// 9. Url Button With Full Webview (default)
bot.global.text(/button with full webview/i, (b) => {
  b.envelope.write('button with full webview')
  b.envelope.payload.quickReply({
      text: 'Book flights',
      url: 'http://www.kayak.com',
      is_webview: true
  })
  return b.respond().catch((err) => console.error(err))
})

// 10. Url Button With Tall Webview
bot.global.text(/button with tall webview/i, (b) => {
  b.envelope.write('button with tall webview')
  b.envelope.payload.quickReply({
      text: 'Book flights',
      url: 'http://www.kayak.com',
      is_webview: true,
      webview_height_ratio: 'tall'
  })
  return b.respond().catch((err) => console.error(err))
})

// 11. Url Button With Compact Webview
bot.global.text(/button with compact webview/i, (b) => {
  b.envelope.write('button with compact webview')
  b.envelope.payload.quickReply({
      text: 'Book flights',
      url: 'http://www.kayak.com',
      is_webview: true,
      webview_height_ratio: 'compact'
  })
  return b.respond().catch((err) => console.error(err))
})

// 12. Attachment with title, image, link and buttons
bot.global.text(/attachment with buttons/i, (b) => {
  b.envelope.write('Attachment with buttons:')
  b.envelope.attach({ 
    title: 'Lauri M(title field)',
    title_link: 'https://www.basketball-reference.com/players/m/markkla01.html',
    text: 'Should have been rookie of the year (text field)',
    description: 'What a great player! (description field)',
    image_url: 'http://www.trbimg.com/img-5b04c449/turbine/ct-spt-bulls-lauri-markkanen-all-rookie-team-20180522',
  })
  b.envelope.payload.quickReply({
    type: 'button',
    text: 'Book flights',
    url: 'http://www.kayak.com',
    is_webview: false
  })
  b.envelope.payload.quickReply({
    type: 'button',
    text: 'Cancel travel request',
    url: 'https://requests.example.com/cancel/r123456',
    is_webview: false
  })
  return b.respond().catch((err) => console.error(err))
})  