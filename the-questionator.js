Questions = new Mongo.Collection('questions');

Questions.allow({
  insert: function(userId, doc) {
    return !! userId;
  }
});

Meteor.methods({
  upvote: function(questionId) {
    var question = Questions.findOne(questionId);
    Questions.update(
      questionId,
      { $set: { votes: question.votes + 1 }}
    );
  },
  
  downvote: function(questionId) {
    var question = Questions.findOne(questionId);
    Questions.update(
      questionId,
      { $set: { votes: question.votes - 1 }}
    );
  }
});

if (Meteor.isClient) {
  
  Meteor.subscribe('questions');
  
  Template.questionsList.helpers({
  	questions: Questions.find({}, {sort: {votes: -1}}), 
  });
  
  Template.questionsList.events({
    'click .vote-up': function(e) {
      e.preventDefault();
      Meteor.call('upvote', this._id);
    },
    
    'click .vote-down': function(e) {
      e.preventDefault();
      Meteor.call('downvote', this._id);
    }
  });
  
  Template.questionForm.events({
    'submit form': function(e) {
      e.preventDefault();
      var textarea = $(e.target).find('#question');
      Questions.insert({
        'text': textarea.val(),
        'votes': 0
      });
      textarea.val('');
    }
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
