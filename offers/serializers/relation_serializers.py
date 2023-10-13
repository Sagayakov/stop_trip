from rest_framework.serializers import ModelSerializer
from ..models.user_relation import UserRelation


class UserTechRelationSerializer(ModelSerializer):
    class Meta:
        model = UserRelation
        fields = ('model_used', 'like', 'rating')
