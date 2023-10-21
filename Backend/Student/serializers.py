from rest_framework import serializers
from .models import Teacher, Student,Certificate

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class TeacherStudentSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True, read_only=True)  

    class Meta:
        model = Teacher
        fields = '__all__'

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'

class CertificatesSerializer(serializers.ModelSerializer):
    teacher_name = serializers.ReadOnlyField(source='teacher.name')
    student_name = serializers.ReadOnlyField(source='student.name')

    class Meta:
        model = Certificate
        fields = ['teacher', 'teacher_name', 'student', 'student_name', 'issue_date', 'certificate_id', 'jwt_token']
