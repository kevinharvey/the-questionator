Questions = new Mongo.Collection('questions');

if (Meteor.isClient) {
  
  Meteor.subscribe('questions');
  
  Template.questionsList.helpers({
  	questions: Questions.find(), 
  });

}

if (Meteor.isServer) {

  if (Questions.find().count() === 0) {
    Questions.insert({
    	text: 'Why does the sun shine?',
    	votes: 0
    });
  
    Questions.insert({
  		text: 'If you were a hot dog, and you were starving to death, would you eat yourself?',
  		votes: 0
  	});
  
    Questions.insert({
  		text: 'What is the airspeed velocity of an unladen swallow?',
  		votes: 0
    });
  }

  Meteor.publish('questions', function() {
    return Questions.find();
  });
}
