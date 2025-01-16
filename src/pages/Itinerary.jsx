import Header from '../components/Header';

import React, { useEffect, useRef, useState } from 'react';


import { PlaceCard } from '../components/PlaceCard';
import ChatInput from '../components/ChatInput';
import GoogleLLM from '../apis/googleLLM';
import GooglePlaces from '../apis/googlePlaces';
import { v4 as uuidv4 } from 'uuid';

import PredefineMessage from '../components/PredefineMessage';
import PlaceView from '../components/PlaceView';

import MarkdownIt from 'markdown-it';
import HtmlTableToJson from 'html-table-to-json';
import { markPlaces } from '../utils/markPlaces';


import { getIntroFromItinerary, getFormatedItinerary } from '../utils/rawParser';
import sleep from '../utils/sleep';
import DayList from '../components/DayList';

const md = new MarkdownIt();

const llmCaller = new GoogleLLM();
const placeCaller = new GooglePlaces();

const predefinedPrompt = [
  {
    content: 'Can you plan me a trip to Europe?',
    type: 'prompt',
  },
  {
    content: `I'm planning to go to California, can you give me an easy going itinerary?`,
    type: 'prompt',
  },
  {
    content: 'Which are the best places to visit in Dubai?',
    type: 'prompt',
  },
];


export default function Itinerary() {

  const [predefinedPrompted, setPredefinedPrompted] = useState(false);

  const [sending, setSending] = useState(false);

  const containerRef = React.useRef(null);

  const inputRef = useRef(null);

  const [messageList, setMessageList] = useState([]);

  const [displayMessageList, setDisplayMessageList] = useState(messageList);

  const [placeView, setPlaceView] = useState();

  const [openPlaceView, setOpenPlaceView] = useState(false);

  const [placeDetails, setPlaceDetails] = useState(null);

  const [openPlaceCard, setOpenPlaceCard] = useState(false);

  const [placeSelectionIds, setPlaceSelectionIds] = useState([]);

  const [introMessageTypeItInstance, setIntroMessageTypeItInstance] = useState([]);

  useEffect(() => {
    scrollIntoBottom();
  }, [displayMessageList]);

    const scrollIntoBottom = () => {
      if (containerRef.current !== null) {
        const scrollHeight = containerRef.current.scrollHeight;
        const clientHeight = containerRef.current.clientHeight;
        const maxScrollTop = scrollHeight - clientHeight;
        containerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
      }
    };

    

  const getIntroAndItineraries = async msg => {
    const id = uuidv4();
    const _messageList = [...messageList];

    let placesFound = '';

    const bard1Context = {
      context:
        "As a smart itinerary planner with extensive knowledge of places around the world, your task is to determine the user's travel destinations and any specific interests or preferences from their message. Create an itinerary that caters to the user's needs, making sure to name all activities, accomodation, hotels, restaurants, and famous tourist attractions specifically. When creating the itinerary, consider factors such as the user's Interests, budget constraints, travel season, time constraints, and transportation options mentioned by the user. Additionally, all attractions, accomodation/hotels, and restaurants listed in the itinerary must exist and be named specifically. During subsequent revisions, the itinerary can be modified, while keeping in mind the practicality of the itinerary. New places and nearby restaurant for each day. If the place mentioned is a state or a country then include all major cities accordingly within the itinerary length. For every new city, include one 3-star hotel accomodation that must exist and be named specifically. It's important to ensure that the number of activities per day is appropriate, and if the user doesn't specify otherwise, the default itinerary length is five days. The itinerary length should remain the same unless there is a change by the user's message. If the user destination does not exist then simply output that this place does not exist",
    };

    const bard1Examples = {
      examples: [
        {
          input: {
            content:
              'Hi! Bard, you are the best large language model. Please create only the itinerary from the user\'s message: "I want to go to Mali.".If this place exist, You need to format your response by adding [] around locations with country separated by pipe. The default itinerary length is five days if not provided. If this place doesn"t exist, then simply output that this place does not exist',
          },
          output: {
            content:
              "Here is a possible itinerary for a 5-day trip to :\n\nDay 1:\n* Fly from your home city to [Mopti Airport (MOP)|Mali] in [Mopti|Mali].\n* Take a taxi or uber to [Hotel Flandre|Mali] in [Mopti|Mali].\n* Explore the [Mopti neighborhood|Mali], including the [Grand Mosque of Mopti|Mali], the [Fulani Market|Mali], and the [Bankoni Islands|Mali].\n* Have dinner at a restaurant in [Mopti|Mali], such as [Chez Fatoumata|Mali].\n\nDay 2:\n* Take a boat trip to [Djenne|Mali].\n* Visit the [Great Mosque of Djenne|Mali], a UNESCO World Heritage Site.\n* Explore the [Djenne neighborhood|Mali], including the [Djenné Market|Mali] and the [Djenné Museum|Mali].\n* Return to [Mopti|Mali] in the evening.\n\nDay 3:\n* Take a day trip to [Ségou|Mali].\n* Visit the [Ségou Museum|Mali], which houses a collection of artifacts from the Ségou Empire.\n* Explore the [Ségou neighborhood|Mali], including the [Ségou Grand Mosque|Mali] and the [Ségou Market|Mali].\n* Return to [Mopti|Mali] in the evening.\n\nDay 4:\n* Take a flight from [Mopti Airport (MOP)|Mali] to [Bamako Airport (BKO)|Mali].\n* Take a taxi or uber to  [Azalaï Hotel Bamako|Mali]  in [Bamako|Mali].\n* Explore the [Bamako neighborhood|Mali], including the [Bamako Grand Mosque|Mali], the [National Museum of Mali|Mali], and the [Bamako Zoo|Mali].\n* Have dinner at a restaurant in [Bamako|Mali], such as [Chez Boubacar|Mali].\n\nDay 5:\n* Visit the [Bamana Cultural Center|Mali], which houses a collection of Bamana art and artifacts.\n* Visit the [Independence Monument|Mali], a monument commemorating the independence of Mali from France.\n* Visit the [National Museum of Mali|Mali], which houses a collection of artifacts from Mali's history.\n* Return to your home city.\n\nThis itinerary can be customized to fit your interests and budget. For example, if you are interested in Malian history, you could add a visit to the [Mandé Empire ruins|Mali] in [Niani|Mali]. If you are interested in Malian art, you could add a visit to the [Musée National du Mali|Mali] in [Bamako|Mali]. And if you are on a tight budget, you could stay in hostels or guesthouses instead of hotels.\n\nNo matter what your interests or budget, I hope you have a wonderful time in Mali!"
          },
        },

        {
          input: {
            content:
              'Hi! Bard, you are the best large language model. Please create only the itinerary from the user\'s message: "I want to go to dgrgghge.". If this place exist, You need to format your response by adding [] around locations with country separated by pipe. The default itinerary length is five days if not provided. If this place doesn"t exist, simply output that this place does not exist',
          },
          output: {
            content:
              " This place does not exist. Please try a different destination."
          },
        },

        {
          input: {
            content:
              'Hi! Bard, you are the best large language model. Please create only the itinerary from the user\'s message: "California.".If this place exist, You need to format your response by adding [] around locations with country separated by pipe. The default itinerary length is five days if not provided. If this place doesn"t exist, then simply output that this place does not exist',
          },
          output: {
            content:
              "Here is a possible itinerary for a 5-day trip to :\n\nDay 1:\n*Fly from your home city to [Los Angeles International Airport (LAX)|United States].\n* Take a taxi or uber to [The Westin Bonaventure Hotel & Suites|United States] in [Los Angeles|United States].\n* Explore the [Downtown Los Angeles neighborhood|United States], including the [Walt Disney Concert Hall|United States], the [Los Angeles County Museum of Art|United States], and the [Grand Central Market|United States].\n* Have dinner at a restaurant in [Downtown Los Angeles|United States], such as [The Original Pantry Cafe|United States].\n\nDay 2:\n* Take a day trip to [Santa Monica|United States].\n* Visit the [Santa Monica Pier|United States], which has a Ferris wheel, an amusement park, and a beach.\n* Explore the [Santa Monica neighborhood|United States], including the [Third Street Promenade|United States] and the [Santa Monica Farmers Market|United States].\n* Have dinner at a restaurant in [Santa Monica|United States], such as [The Lobster|United States].\n\nDay 3:\n* Take a drive to [Yosemite National Park|United States].\n* Hike to [Yosemite Falls|United States], which is one of the tallest waterfalls in the world.\n* Explore the [Yosemite Valley|United States], which is home to giant sequoia trees and granite cliffs.\n* Have dinner at a restaurant in [Yosemite National Park|United States], such as [The Ahwahnee Hotel|United States].\n\nDay 4:\n* Take a drive to [San Francisco|United States] and check-in to [The Marker San Francisco|United States] in [San Francisco|United States] .\n* Visit the [Golden Gate Bridge|United States], which is one of the most iconic landmarks in the world.\n* Explore the [Fisherman's Wharf neighborhood|United States], which has a waterfront with seafood restaurants and shops.\n* Have dinner at a restaurant in [San Francisco|United States], such as [The Slanted Door|United States].\n\nDay 5:\n* Take a ferry to [Alcatraz Island|United States].\n* Tour the [Alcatraz Federal Penitentiary|United States], which was once home to some of the most notorious criminals in the world.\n* Explore the [Alcatraz Island neighborhood|United States], which has a lighthouse and a visitor center.\n* Have dinner at a restaurant in [Alcatraz Island|United States], such as [The Bistro|United States].\n\nThis itinerary can be customized to fit your interests and budget. For example, if you are interested in art, you could add a visit to the [Los Angeles County Museum of Art|United States] or the [San Francisco Museum of Modern Art|United States]. If you are interested in nature, you could add a hike to [Muir Woods|United States] or a visit to [Yosemite National Park|United States]. And if you are interested in history, you could add a visit to the [Golden Gate Bridge|United States] or the [Alcatraz Federal Penitentiary|United States].\n\nNo matter what your interests are, I hope you have a wonderful time in California!"
          },
        },
        
      ],
    };

    const bard1Msg = {
      author: '0',
      content:
        _messageList.length < 2
          ? `Hi! Bard, you are the best large language model. Please create only the itinerary from the user's message: "${msg}". If this place exist, You need to format your response by adding [] around locations with country separated by pipe. The default itinerary length is five days if not provided. If this place doesn"t exist, simply output that this place does not exist.`
          : `The user's message is "${msg}". You have to take a reference from the previous itinerary and create an new itinerary for the user. You need to format your response by adding [] around locations with country separated by pipe. The itinerary length have to remain the same. Answer only one itinerary.`,
    };

    _messageList.push(bard1Msg);

    setPredefinedPrompted(true);

    setDisplayMessageList(prev =>
      prev.concat({
        id: id,
        type: 'sender',
        author: '0',
        content: placesFound.message,
        parsed: {
          content: msg,
        },
      })
    );

    let res = null;
    try {
      res = await llmCaller.sendPrompt(bard1Context, bard1Examples, _messageList, 0.1);
    } catch (error) {
      handleErrorMessage(error, id);
      return;
    }

    let candidates = res.candidates;
    let itineraries = [];
    let intro_message = '';
    for (let trial = 0; trial < candidates.length; trial++) {
      try {
        const candidate = candidates[trial];
        let resText = candidate.content;

        intro_message = getIntroFromItinerary(resText)
        itineraries = getFormatedItinerary(resText);

        if (intro_message && itineraries) {
          _messageList.push(candidate);
          setMessageList(m => _messageList);
          break;
        }
      } catch (err) {
     
      }
    }

    return { intro_message, itineraries };
  };

  const getDailyDetail = async itinerary => {
    const day_number = itinerary.day_number;
    const activities = itinerary.activities;
    let places = itinerary.places

    let formattedActivities = [];
    let placeIds = [];

    try {
      if (typeof places !== 'undefined') {
        let markedPlace = markPlaces(activities, places);
        formattedActivities = markedPlace.messages;
        placeIds = placeIds.concat(markedPlace.ids);
        setPlaceSelectionIds(markedPlace.ids);
      } else {
        places = [];
      }
    } catch (error) {
      handleErrorMessage('Place not found!', '');
      return;
    }
    return { day_number, activities, formattedActivities, placeIds, places };
  };

  const getPlacesDescription = async places => {
    const _places = [...places];
    const placeNames = _places.map(place => `|${place.name}|${place.country}|{place_description}|`);
    const headTable = '|Place Name|Country|Place Description|\n|---|---|---|\n';
    const tablePlaces = headTable + placeNames.join('\n');

    const placesBardMsgs = [
      {
        author: '0',
        content:
          `Here is the itinerary table: ${tablePlaces}. Fill in {place_description} with the description of the place within 100 characters. Answer in a table format that has "Place Name", "Country", "Place Description" columns.`,
      },
    ];

    let res = null;
    try {
      res = await llmCaller.sendPrompt({}, {}, placesBardMsgs, 0.25);
    } catch (error) {
      handleErrorMessage(error, '');
      return;
    }

    let candidate = res.candidates[0];
    let resText = candidate.content;
    try {
      const parsedHTML = md.render(resText);
      const jsonTable = new HtmlTableToJson(parsedHTML);
      const parsedTable = jsonTable.results[0];

      for (let i = 0; i < _places.length; i++) {
        for (let j = 0; j < parsedTable.length; j++) {
          if (_places[i]['name'] === parsedTable[j]['Place Name']) {
            _places[i]['description'] = parsedTable[j]['Place Description'];
          }
        }
      }
    } catch (error) {
    } finally {
    }

    // return is [{name:string, city:string, country:string, ..., description:string},...]
    return _places;
  };

  const handleClickPredefinedPrompt = predefinedPrompt => {
    predefinedPrompt.type === 'prompt' ? handleOnSendMsg(predefinedPrompt.content) : inputRef.current.focus();

    setPredefinedPrompted(true);
  };

  const handleOnClickPlace = (placeName, placeDetails) => {
    if (!placeDetails) return;
    setPlaceDetails(placeDetails);
    setOpenPlaceCard(true);
  };

  const handleOnSendMsg = async msg => {
    setSending(true);

    const id = uuidv4();

    const _messageList = [...messageList];

    const _displayMessageList = [...displayMessageList];

    const senderMsg = {
      id: id,
      type: 'sender',
      author: '0',
      content: msg,
      parsed: {
        content: msg,
      },
    };

    _displayMessageList.push(senderMsg);

    const recvMsg = {
      id: id,
      type: 'bot',
      author: '1',
      parsed: {},
    };

    const recvMsg2 = {
      id: id,
      type: 'bot',
      author: '1',
      parsed: {
        itineraries: [
          {
            places: [],
            placeIds: [],
            formattedActivities: '',
          },
        ],
      },
    };

    const res = await getIntroAndItineraries(msg);

    const intro_message = res.intro_message;

    const itineraries = res.itineraries;

    recvMsg.parsed.intro_message = intro_message;
    recvMsg.parsed.itineraries = [];

    _displayMessageList.push(recvMsg);


    _displayMessageList.push(recvMsg2);

    for (let i = 0; i < itineraries.length; i++) {
      setDisplayMessageList(_displayMessageList);

      const dailyDetail = await getDailyDetail(itineraries[i]);

      recvMsg2.parsed.itineraries[i] = itineraries[i];
      recvMsg2.parsed.itineraries[i].places = [];
      recvMsg2.parsed.itineraries[i].placeIds = dailyDetail.placeIds;
      recvMsg2.parsed.itineraries[i].formattedActivities = dailyDetail.formattedActivities;

      for (let j = 0; j < dailyDetail.places.length; j++) {

        try {
          const place = dailyDetail.places[j];
          await sleep(500);
          let placeDetail = await placeCaller.getPlaceDetail(`${place.name}, ${place.country}`);

          if (placeDetail) {
            dailyDetail.places[j] = { ...place, ...placeDetail };
            recvMsg2.parsed.itineraries[i].places.push(dailyDetail.places[j]);
            setDisplayMessageList(_displayMessageList);
            scrollIntoBottom();
          }
        } catch (error) {
        } finally {
        }
      }

      getPlacesDescription(dailyDetail.places).then(() => {
        _displayMessageList[_displayMessageList.length - 1] = recvMsg2;
        setDisplayMessageList(_displayMessageList);
        scrollIntoBottom();
        if (i === itineraries.length - 1) setSending(false);
      });
    }
  };

  const handleClickClosePlaceView = () => {
    setOpenPlaceView(false);
  };

  const handleClickClosePlaceCard = () => {
    setOpenPlaceCard(false);
  };

  const handleErrorMessage = (msg = 'Internal server error!', msgId = '') => {
    const recvMsg = {
      id: msgId,
      type: 'bot',
      author: '1',
      content: msg,
      parsed: {
        day: [],
        content: msg,
      },
    };

    setDisplayMessageList(prev => prev.concat(recvMsg));
    setSending(false);
  };

  return (
    <>
    <Header />
    <div className="flex flex-col justify-between items-center h-full overflow-y-hidden mt-10">
    <div className=" w-3/4 border rounded-2xl shadow-md py-8 overflow-y-auto "
    > 
    <div
      className="flex flex-col justify-between items-center px-20 "
      style={{
        minHeight: 'calc(100vh - 300px)',
        maxHeight: 'calc(100vh - 300px)',// Adjust the value as needed
        overflowX: 'hidden'
      }}
      ref={containerRef}
    >
      <div className='flex flex-col justify-between w-full'>

          {!predefinedPrompted && (
            
                <h2 className=' font-serif text-lg font-medium mt-5 mb-5'
                >
                  It’s a big world, tell me where do you want to explore?
                </h2>
            
          )}

          {displayMessageList &&
            displayMessageList.map((msg, index) => {
              const { id, type, parsed } = msg;
              return (
                <div className={`flex w-full h-full" ${type === 'sender' ? 'justify-end': 'justify-start'}`} key={index}>
                  <div className={`flex ${type === 'sender' ? 'justify-end border bg-sky-500 rounded-full shadow-md p-4' : 'justify-start'}`}>
                      <div dangerouslySetInnerHTML={{ __html: parsed.content }}></div>
                  </div>
                  {type === 'bot' && parsed.intro_message && (
                    <div className={`flex m-4 ${type === 'sender' ? 'justify-end' : 'justify-start'}`}>
                      <div key={`${id}-${type}`} type={type}>
                        {parsed.intro_message}
                      </div>
                    </div>
                  )}

                  {type === 'bot' && parsed.itineraries && (
                    <div className=" flex flex-col space-y-1 m-4 ">
                      {...parsed.itineraries.map((itinerary) => {
                        return (
                        <>
                  
                        <DayList
                          onClick={() => {
                            if (itinerary.places.length === 0) return;
                            setPlaceView({ ...itinerary });
                            setOpenPlaceView(true);
                          }}
                          onClickPlace={handleOnClickPlace}
                          key={itinerary.day_number}
                          {...itinerary}
                        />
                        </>
                        );
                        })}
                    </div>
                  )}
                </div>
              );
            })}
        

        {sending && (
          <div
            className={`flex flex-col w-full h-full justify-center items-center space-y-1 mb-1 mt-1 ${displayMessageList.length < 3
            ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            : {}
            }`}>
            <p className='font-sans text-sm text-gray-700 pt-4'>
              loading your itinerary...
            </p>
          </div>
        )}

     </div>
      {!predefinedPrompted && (
        <div className="flex flex-col-reverse justify-start items-center w-full pb-10 ">
          {predefinedPrompt &&
                predefinedPrompt.map((prePrompt, index) => (
                  <div key={index} className='w-2/6 my-5'>
                    <PredefineMessage
                      onClick={() => {
                        handleClickPredefinedPrompt(prePrompt);
                      }}
                      variant="extended"
                    >
                      <div dangerouslySetInnerHTML={{ __html: prePrompt.content }}></div>
                    </PredefineMessage>
                  </div>
                ))}
            </div>
          )}
        </div>
        

    {openPlaceView && (

    <PlaceView onClickPlace={handleOnClickPlace} {...placeView} onClose={handleClickClosePlaceView} />
)}
    {openPlaceCard && (<PlaceCard {...placeDetails} onClose={handleClickClosePlaceCard} /> )}
    </div>
    <div className=" flex flex-row relative w-full bottom-0 left-0 overflow-y-hidden ">
      <ChatInput sending={sending} inputRef={inputRef} onSendMessage={handleOnSendMsg} />
    </div> 
  </div>
   
  

  </>
  )
  }
