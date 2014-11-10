if (Meteor.isClient){
  var questionsData = [
  	{
  		text: 'Why does the sun shine?',
  		votes: 0
  	},
  	{
  		text: 'If you were a hot dog, and you were starving to death, would you eat yourself?',
  		votes: 0
  	},
  	{
  		text: 'What is the airspeed velocity of an unladen swallow?',
  		votes: 0
  	}
  ];

  Template.questionsList.helpers({
  	questions: questionsData
  });
}
