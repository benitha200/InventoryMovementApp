# accounts/views.py
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer,UserLoginSerializer
from .models import CustomUser

class RegisterAPIView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Get the CustomUser instance from the user object
        custom_user = user  # Assuming user object is CustomUser instance
        token, created = Token.objects.get_or_create(user=custom_user)
        user_data = UserSerializer(custom_user, context=self.get_serializer_context()).data
        return Response({
            "user": user_data,
            "token": token.key
        })
    

class LoginAPIView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer  

    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = CustomUser.objects.filter(email=email).first()
        if user and user.check_password(password):
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": token.key
            })
        else:
            return Response({"error": "Invalid credentials"}, status=401)