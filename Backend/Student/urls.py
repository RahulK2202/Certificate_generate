from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from .views import *


urlpatterns = [

  path('display/',  TeacherListView.as_view(), name='admin-display'),
  path('studentdata/<int:pk>/', StudentDataView.as_view(), name='admin-data'),
  path('createcertificate/', CreateCertificate.as_view(), name='create-certificate'),
  path('verifycertificate/<str:certificate_id>/', VerifyCertificate.as_view(), name='verify_certificate'),

  path('api/students/', views.StudentList.as_view(), name='student-list'),
  path('api/teacher/<int:student_id>/', views.TeacherDetail.as_view(), name='teacher-detail'),
  path('api/getcertificate/<int:teacher_id>/<int:student_id>/', views.GetCertificate.as_view(), name='get_certificate'),

]