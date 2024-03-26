from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'fullname', 'phoneno', 'post', 'role', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            fullname=validated_data['fullname'],
            phoneno=validated_data['phoneno'],
            post=validated_data['post'],
            role=validated_data['role'],
            password=validated_data['password']
        )
        return user
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = CustomUser.objects.filter(email=email).first()

            if user:
                if user.check_password(password):
                    return user
                else:
                    raise serializers.ValidationError("Incorrect password.")
            else:
                raise serializers.ValidationError("User with this email does not exist.")
        else:
            raise serializers.ValidationError("Both email and password are required.")