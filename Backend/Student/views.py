from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
import random
import string
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import Student, Teacher
from .serializers import StudentSerializer, TeacherSerializer


# Create your views here.
class TeacherListView(APIView):
    def get(self, request):
        data = Teacher.objects.all()
        serializer = TeacherSerializer(data, many=True) 
        return Response(serializer.data)
    

class  StudentDataView(APIView):

 
    def get(self, request, pk):
        teacher = Teacher.objects.get(id=pk)
        students = teacher.students.all()
        data = []

        for student in students:
            certificate_generated = Certificate.objects.filter(teacher=teacher, student=student).exists()
            data.append({
                "id": student.id,
                "name": student.name,
                "has_certificate": certificate_generated,
            })

        return Response({"students": data})
    
class CreateCertificate(APIView):
    

    def post(self, request):
      
        teacher_id = request.data.get('teacher_id')
        student_id = request.data.get('student_id')
    
      

        try:
            teacher = Teacher.objects.get(id=teacher_id)
            student = Student.objects.get(id=student_id)
           
            def generate_certificate_id(length=3):
                    letters = string.ascii_uppercase
                    digits = ''.join(random.choice(string.digits) for _ in range(3))
                    return ''.join(random.choice(letters) for _ in range(length)) + digits

            certificate_id = generate_certificate_id()
            

          
            certificate = Certificate(teacher=teacher, student=student,certificate_id=certificate_id)
            certificate.generate_jwt()  
       
            serializer = CertificateSerializer(certificate)
            response_data = serializer.data
            response_data['has_certificate'] = True 
            return Response(response_data)
        except Teacher.DoesNotExist:
            return Response({'error': 'Teacher not found'})
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'})
        
class VerifyCertificate(APIView):
    def get(self, request,certificate_id):
        try:
            certificate = Certificate.objects.get(certificate_id=certificate_id)
         
            decoded = jwt.decode(certificate.jwt_token, settings.SECRET_KEY, algorithms=['HS256'])
            teacher_id = decoded['teacher_id']
            student_id = decoded['student_id']
            certificate_query = Certificate.objects.filter(teacher_id=teacher_id, student_id=student_id)
            
            if certificate_query.exists():
                certificate = certificate_query.first()
                serializer = CertificateSerializer(certificate)
                return Response({'data': serializer.data, 'message': 'Certificate verified'})
            else:
                return Response({'error': 'Certificate not found or invalid'})
        except Certificate.DoesNotExist:
            return Response({'error': 'Certificate not found'})
        except jwt.DecodeError:
            return Response({'error': 'Invalid token'})
        

class StudentList(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class TeacherDetail(APIView):
    def get(self, request, student_id):
        student = get_object_or_404(Student, pk=student_id)
        teachers = student.teachers.all()
        teacher_serializer = TeacherSerializer(teachers, many=True)
        return Response(teacher_serializer.data)
    
class GetCertificate(APIView):
    def get(self, request, teacher_id, student_id):
        try:
            certificate = Certificate.objects.get(teacher__id=teacher_id, student__id=student_id)
            serializer = CertificatesSerializer(certificate)
            return Response(serializer.data)
        except Certificate.DoesNotExist:
            return Response({'error': 'Certificate not found'})
    
