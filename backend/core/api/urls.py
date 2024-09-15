from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ChatViewSet, MessageViewSet

post_router = DefaultRouter()
post_router.register(r'Chat', ChatViewSet, basename='Chat')
post_router.register(r'Message', MessageViewSet, basename='Message')