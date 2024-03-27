from rest_framework import serializers
from .models import CustomUser,Roles

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Roles
        fields="__all__"

class UserSerializer(serializers.ModelSerializer):
    role = serializers.PrimaryKeyRelatedField(queryset=Roles.objects.all())

    class Meta:
        model = CustomUser
        fields = ('email', 'fullname', 'phoneno', 'post', 'role', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            fullname=validated_data['fullname'],
            phoneno=validated_data['phoneno'],
            post=validated_data['post'],
            role=validated_data['role'], 
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user


