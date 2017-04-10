var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLBoolean
} = require('graphql');

var {
	instagram
} = require('./../../API/instagramAPI');

var {
	usersType,
	userInfoType,
	usersSearchType,
} = require('./instagramSchema/usersSchema');

var {
	usersSelfFollowsType,
	usersSelfFollowedByType,
	usersSelfRequestedByType,
	usersRelationshipType,
} = require('./instagramSchema/relationshipsSchema');

var {
	mediaIDType,
	mediaShortCodeType,
	mediaSearchType
} = require('./instagramSchema/mediaSchema.js');

var {
	likesType
} = require('./instagramSchema/likesSchema.js');

var {
	commentsType
} = require('./instagramSchema/commentsSchema.js');

const instagramQueryType = new GraphQLObjectType({
	name: 'instagramQuery',
	description: 'instagram api call',
	fields: () => ({
		usersSelf : {
			type: usersType,
			resolve:(_, args) => instagram(args, "usersSelf")
		},
		users : {
			type: usersType,
			args:{
				user_id: {
					type: GraphQLInt,
					description: "User Id"
				},
			},
			resolve:(_, args) => instagram(args, "users")
		},
		usersSearch : {
			type: usersSearchType,
			args:{
				q: {
					type: GraphQLString,
					description: "A query string"
				},
				count: {
					type: GraphQLInt,
					description: "Number of users to return"
				}
			},
			resolve:(_, args) => instagram(args, "usersSearch")
		},
		usersSelfFollows: {
			type: usersSelfFollowsType,
			resolve:(_, args) => instagram(args, "usersSelfFollows")
		},
		usersSelfFollowedBy:{
			type: usersSelfFollowedByType,
			resolve:(_, args) => instagram(args, "usersSelfFollowedBy")
		},
		usersSelfRequestedBy:{
			type: usersSelfRequestedByType,
			resolve:(_, args) => instagram(args, "usersSelfRequestedBy")
		},
		usersRelationship:{
			type: usersRelationshipType,
			args:{
				user_id: {
					type: GraphQLInt,
					description: "User Id"
				}
			},
			resolve:(_, args) => instagram(args, "usersRelationship")
		},
		mediaID:{
			type: mediaIDType,
			args:{
				media_id: {
					type: GraphQLString,
					description: "Media ID"
				}
			},
			resolve:(_, args) => instagram(args, "mediaID")
		},
		mediaShortCode:{
			type: mediaShortCodeType,
			args:{
				shortcode: {
					type: GraphQLString,
					description: "Media Short Code"
				}
			},
			resolve:(_, args) => instagram(args, "mediaShortCode")
		},
		mediaSearch:{
			type: mediaSearchType,
			args:{
				lat: {
					type: GraphQLString,
					description: "Media Search Latitude"
				},
				lng: {
					type: GraphQLString,
					description: "Media Search Longitude"
				}
			},
			resolve:(_, args) => instagram(args, "mediaSearch")
		},
		comments:{
			type: commentsType,
			args:{
				media_id: {
					type: GraphQLString,
					description: "comments"
				}
			},
			resolve:(_, args) => instagram(args, "comments")
		},
		likes:{
			type: likesType,
			args:{
				media_id: {
					type: GraphQLString,
					description: "likes"
				}
			},
			resolve:(_, args) => instagram(args, "likes")
		},
	})
})

module.exports = {
	instagramQueryType
}
