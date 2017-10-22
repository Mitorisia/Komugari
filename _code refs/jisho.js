//Grabs a definition from Jisho.org
module.exports = function command(bot, info)
{
  'use strict';
  const utility = info.utility;
  return{
    name: 'Jisho',
    inline: false,
    alias: ['j'],
    description: '[<word/sentence>, <word/sentence> --list, <word/sentence> <number from --list>] Looks up a word from Jisho.org, you may use jisho <word> --list to get a list of definitions. Then use jisho <word> <number> and that will display the definition',
    permissions: 'public',
    action: function(details)
    {
      const out = {};
      //searches Jisho.org for a definition
      const searchJisho = function(w,n)
      {
        const request = require('request');
        const urlencode = require('urlencode');
        var url = 'http://jisho.org/api/v1/search/words?keyword=';
        //encode the URL to be used for the request (in order to work with JP), then make the API call
        url += urlencode(w);
        request({
          url: url,
          json: true
        }, function (error, response, body)
        {
          if (!error && response.statusCode === 200)
          {
            bot.sendMessage(details.channelID, {
              embed:{
                title: '',
                description: '',
                fields: prettyDisplay(body,n),
                color: parseInt('a7fcd0', 16)
              }
            });
          }
        });
      };
      //lists all of the different readings/definitions returned by Jisho.org
      //if there are more than 10, it will be sent to the user via PM
      const listJisho = function(w)
      {
        const request = require('request');
        const urlencode = require('urlencode');
        var url = 'http://jisho.org/api/v1/search/words?keyword=';
        url += urlencode(w);
        request({
          url: url,
          json: true
        }, function (error, response, body)
        {
          if (!error && response.statusCode === 200)
          {
            if(body.data.length > 10 && details.isDirectMessage)
            {
              bot.sendMessage(details.userID, {
                embed: {
                  title: 'Reading List:',
                  description: listJapanese(body) + '\nUse jisho(j) <word> <number on list> to get that definition',
                  color: parseInt('a7fcd0', 16)
                }
              });
            }
            else if(body.data.length > 10 && !details.isDirectMessage)
            {
              bot.sendMessage(details.channelID, {
                message: 'The word returned more than 10 items, sending a PM of the list!'
              });
              bot.sendMessage(details.userID, {
                embed: {
                  title: 'Reading List:',
                  description: listJapanese(body) + '\nUse jisho(j) <word> <number on list> to get that definition',
                  color: parseInt('a7fcd0', 16)
                }
              });
            }
            else
            {
              bot.sendMessage(details.channelID, {
                embed: {
                  title: 'Reading List:',
                  description: listJapanese(body) + '\nUse jisho(j) <word> <number on list> to get that definition',
                  color: parseInt('a7fcd0', 16)
                }
              });
            }
          }
        });
      };
      //list the japanese readings
      const listJapanese = function(api)
      {
        let list = '';
        for(let i = 0; i < api.data.length; i ++)
        {
          let line = '';
          line += (i+1) + '.' + getJapanese(api.data[i].japanese);
          if(i != (api.data.length - 1))
          {
            line += '\n';
          }
          list += line;
        }
        return list;
      };
      //grab the japanese readings
      const getJapanese = function(japaneseArr)
      {
        let ret = '';
        for(let i = 0; i < japaneseArr.length; i ++)
        {
          let line = '';
          if(japaneseArr[i].word == undefined)
          {
            line += ' (' + japaneseArr[i].reading + ')';
          }
          else if(japaneseArr[i].reading == undefined)
          {
            line += ' ' + japaneseArr[i].word;
          }
          else
          {
            line += ' ' + japaneseArr[i].word + ' (' + japaneseArr[i].reading + ')';
          }
          if(i != japaneseArr.length - 1)
          {
            line += ',';
          }
          ret += line;
        }
        return ret;
      };
      //gets the definitions
      const getDefinitions = function(sensesArr)
      {
        let definitions = '';
        let numDefs = 0;
        for(var i = 0; i < sensesArr.length; i ++)
        {
          if(sensesArr[i].english_definitions !== undefined)
          {
            definitions += (numDefs+1) + '. ';
            numDefs ++;
            if(concatArr(sensesArr[i].parts_of_speech) == '')
            {
              if(concatArr(sensesArr[i].tags) == '')
              {
                definitions += concatArr(sensesArr[i].english_definitions) +'\n';
              }
              else
              {
                definitions+= concatArr(sensesArr[i].english_definitions) + ' - ' + concatArr(sensesArr[i].tags) + '. ' + concatArr(sensesArr[i].info) + '\n';
              }
            }
            else
            {
              definitions += '*' + concatArr(sensesArr[i].parts_of_speech) + '*: ';
              if(concatArr(sensesArr[i].tags) == '')
              {
                definitions += concatArr(sensesArr[i].english_definitions) + '\n';
              }
              else
              {
                definitions+= concatArr(sensesArr[i].english_definitions) + ' - ' + concatArr(sensesArr[i].tags) + '. '+ concatArr(sensesArr[i].info) + '\n';
              }
            }
          }
          
          
        }
        return definitions;
      };
      //concatenates an array to one line
      const concatArr = function(arr)
      {
        let s = '';
        if(arr !== undefined)
        {
          for(let i = 0; i < arr.length; i++)
          {
            if(arr[i] != null)
            {
              if(i == (arr.length - 1))
              {
                s += arr[i];
              }
              else
              {
                s += arr[i] + ', ';
              }
            }
          }
        }
        
        return s;
      };
      //takes all of the data found and displays it nicely
      const prettyDisplay = function(api, num)
      {
        let readField = {name: 'Reading(s):',inline: true};
        let tagField = {name: 'Tag(s):',inline: true};
        let defField = {name: 'Definition(s):', inline: false};
        let fields = [];
        try
        {
          if(api.data[num] == undefined)
          {
            throw 'api.data is undefined';
          }
          else
          {
            const tags = getTags(api.data[num]);
            readField.value = getJapanese(api.data[num].japanese);
            fields.push(readField);
            if(tags != '')
            {
              tagField.value = tags;
              fields.push(tagField);
            }
            defField.value = getDefinitions(api.data[num].senses);
            if(api.data.length > 10)
            {
              defField.value += 'The lookup has more than 10 items from Jisho. Try jisho(j) <word> --list for the list.';
            }
            fields.push(defField);
          }
        }
        catch(err)
        {
          console.log( 'Error occured: Error Code ' + err +' - something was looked up that would break bot. Writing to dump file.' + new Date());
          fields = [{name:'Error',value: 'Error occured with that lookup. Try the command again. If that command doesn\'t work, please contact CyberRonin',inline:true}];
        }
        return fields;
      };
      //grabs the tags from the call
      const getTags = function(dataArr)
      {
        let tags = '';
        if(dataArr.is_common == true)
        {
          tags += '`Common` ';
        }
        tags += concatTags(dataArr.tags);
        return tags;
      };
      //lists the tags a little nicer
      const concatTags = function(arr)
      {
        let s = '';
        for(let i = 0; i < arr.length; i++)
        {
          if(i == (arr.length - 1))
          {
            s += utility.codeInline(arr[i]);
            s += ' ';
          }
          else
          {
            s += utility.codeInline(arr[i]);
            s += ' ';
          }
        }
        return s;
      };
      //processes the command
      //to better understand this part, take a look at the parameters at the top of the page
      if(details.input === '') {return;}
      else if(details.input.search(/.+\s(--list)/g) != -1)
      {
        listJisho(details.input.replace(' --list', ''));
        return;
      }
      else if(details.input.search(/^.+\s[1-9][0-9]*$/g) != -1)
      {
        let patt = /[1-9][0-9]*$/g;
        let num = parseInt(patt.exec(details.input),10);
        console.log('Num is ' + num + ' details is ' + details.input);
        console.log('Searching for ' + details.input.replace(/\s[1-9][0-9]*/g, ''));
        searchJisho(details.input.replace(/\s[1-9][0-9]*/g, ''),num - 1);
        return;
      }
      else
      {
        searchJisho(details.input, 0);
        return;
      }
    }
  };
};