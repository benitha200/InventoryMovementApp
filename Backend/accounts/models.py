from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.models import Group, Permission
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext as _
# from .managers import CustomUserManager

class Roles(models.Model):
    name=models.CharField(max_length=200)

    class Meta:
        db_table="user_roles"

class CustomUserManager(BaseUserManager):
    def create_user(self, email, fullname, phoneno, post, role, username, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            fullname=fullname,
            phoneno=phoneno,
            post=post,
            username=username,
            role=role,  # Pass the role as a string
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, fullname, phoneno, post, role, username, password=None):
        user = self.create_user(
            email=email,
            fullname=fullname,
            phoneno=phoneno,
            post=post,
            role=role,  # Pass the role as a string
            username=username,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('email address', unique=True)
    fullname = models.CharField(max_length=100)
    phoneno = models.CharField(max_length=20)
    post = models.CharField(max_length=50)
    role = models.ForeignKey(Roles, on_delete=models.SET_NULL, null=True, blank=True)
    username = models.CharField(max_length=30, unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fullname', 'phoneno', 'post', 'role', 'username']

    def __str__(self):
        return self.email

    class Meta:
        permissions = (
            ('can_add_post', 'Can add post'),
            ('can_edit_post', 'Can edit post'),
            ('can_delete_post', 'Can delete post'),
        )

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=_('groups'),
        blank=True,
        help_text=_(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name='custom_user_set',  
        related_query_name='custom_user', 
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name='custom_user_set',  
        related_query_name='custom_user',  
    )

