# accounts/permissions.py
from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'admin'

class IsShiftLeader(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'shift_leader'

class IsProductionManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'production_manager'